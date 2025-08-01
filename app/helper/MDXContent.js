"use client";
import shortcodes from "@layouts/shortcodes/all";
import "highlight.js/styles/solarized-light.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MDXContent = ({ content }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const mdxOptions = {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  };

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
        const response = await fetch('http://localhost:8000/api/v1/auth/me', {
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
    <>
      {/* @ts-ignore */}
      <MDXRemote
        source={content}
        components={shortcodes}
        options={{ mdxOptions }}
      />
      <div className="flex items-center justify-end pr-16 lg:pr-0">
        <button
          onClick={() => {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
              select.value = 'hi';
              select.dispatchEvent(new Event('change'));
            }
          }}
          className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
        >
          हिंदी में देखें
        </button>
        {!isLoggedIn && (
        <Link
          href="/login-user"
          className="hidden px-5 py-2 text-base font-medium text-indigo-600 border border-indigo-600 rounded mr-2 md:block hover:bg-indigo-50 transition"
        >
          Login
        </Link>
        )}
        <button
          onClick={isLoggedIn ? handleLogout : handleGetEnrolled}
          className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
        >
          {isLoggedIn ? 'Logout' : 'Get Enrolled'}
        </button>
      </div>
    </>
  );
};

export default MDXContent;
