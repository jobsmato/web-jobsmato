"use client";
import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';

function Cta() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { title, content, button, enable } = config.call_to_action;
  if (!enable) return;

  // Check login status on component mount and listen for changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('access_token');
      setIsLoggedIn(!!token);
    };

    // Check initial status
    checkLoginStatus();

    // Listen for storage changes (when user logs in/out from other components)
    const handleStorageChange = (e) => {
      if (e.key === 'access_token') {
        checkLoginStatus();
      }
    };

    // Listen for custom login/logout events
    const handleLoginEvent = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleLoginEvent);
    window.addEventListener('userLogout', handleLoginEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleLoginEvent);
      window.removeEventListener('userLogout', handleLoginEvent);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Clear all localStorage variables
    localStorage.clear();
    
    // Clear any potential session cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    // Update login status
    setIsLoggedIn(false);
    
    // Dispatch logout event for other components
    window.dispatchEvent(new Event('userLogout'));
    
    // Force a page reload to clear any cached state
    window.location.href = '/';
  };

  // Handle Get Enrolled button click
  const handleGetEnrolled = async () => {
    const token = localStorage.getItem('access_token');
    const userType = localStorage.getItem('user_type');
    
    if (token) {
      // Check if user is a recruiter
      if (userType === 'recruiter') {
        // Recruiter should go to recruiter dashboard
        router.push('/recruiter/dashboard');
        return;
      }
      
      // For regular users, check profile completion
      try {
        // Get current user profile to check completion status
        const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.ME), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('User profile data:', userData);

          // Check if user has completed onboarding
          if (userData.has_candidate_profile && userData.candidate_id) {
            // User has completed onboarding, redirect to dashboard
            console.log('User has completed onboarding, redirecting to dashboard');
            const userId = userData.id || '';
            router.push(`/dashboard?user_id=${userId}`);
            return;
          } else {
            // User hasn't completed onboarding, redirect to onboarding
            console.log('User needs to complete onboarding, redirecting to onboarding');
            const userId = userData.id || '';
            router.push(`/onboarding/candidate?user_id=${userId}`);
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // If API call fails, default to onboarding
        router.push('/onboarding/candidate');
        return;
      }
    } else {
      // User is not logged in, redirect to login
      router.push('/login-user');
    }
  };

  return (
    <section className="cta section pt-0">
      <div className="container-xl">
        <div className="section relative px-4 text-center">
          <div className="animate">
            {markdownify(title, "h2", "section-title")}
            {markdownify(content, "p", "mt-10")}
            <button 
              onClick={isLoggedIn ? handleLogout : handleGetEnrolled} 
              className="btn btn-primary mt-10"
            >
              {isLoggedIn ? 'Logout' : button.label}
            </button>
          </div>
          <div className="bg-theme animated-bg absolute top-0 left-0 w-full after:hidden">
            <ImageFallback
              src="/images/wave.svg"
              fill={true}
              sizes="100vw"
              alt="bg wave"
            />
            <Circle
              className="left-[10%] top-12"
              width={32}
              height={32}
              fill={false}
            />
            <Circle className="left-[3%] bottom-[13%]" width={85} height={85} />
            <Circle
              className="left-[15%] bottom-[35%]"
              width={47}
              height={47}
              fill={false}
            />

            <Circle className="right-[12%] top-[12%]" width={20} height={20} />
            <Circle
              className="right-[2%] bottom-[30%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="right-[19%] bottom-[16%]"
              width={37}
              height={37}
              fill={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
