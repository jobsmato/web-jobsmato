import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { ArrowUp } from "lucide-react";
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';

const FloatingButton = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  // Handle Enroll Now button click
  const handleEnrollNow = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
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
            router.push('/dashboard');
            return;
          } else {
            // User hasn't completed onboarding, redirect to onboarding
            console.log('User needs to complete onboarding, redirecting to onboarding');
            router.push('/onboarding/candidate');
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

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={handleEnrollNow}
      className={`fixed bottom-20 right-6 rounded-full bg-primary  px-4 py-2 font-mono font-bold text-white transition-colors duration-300 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-blue-500 hover:bg-blue-700 hover:before:bg-blue-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      Enroll Now
    </button>
  );
};

export default FloatingButton;


