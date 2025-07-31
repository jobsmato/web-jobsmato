"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function AuthSuccess() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        // Get token from URL parameters
        const token = searchParams.get('token');
        
        if (!token) {
          throw new Error('No token received from authentication');
        }

        console.log('Token received:', token);

        // Clear any old data first to prevent data contamination
        localStorage.removeItem('candidate_id');
        localStorage.removeItem('user_type');
        localStorage.removeItem('user_email');
        
        // Store the token in localStorage
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_type', 'user'); // Default to user, you might want to determine this from the token or API call
        
        // Dispatch login event for other components
        window.dispatchEvent(new Event('userLogin'));

        // Get user profile to check if they have a candidate profile
        try {
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
            
            // Store additional user information
            if (userData.user_type) {
              localStorage.setItem('user_type', userData.user_type);
            }
            if (userData.email) {
              localStorage.setItem('user_email', userData.email);
            }
            if (userData.candidate_id) {
              localStorage.setItem('candidate_id', userData.candidate_id);
            }
            if (userData.id) {
              localStorage.setItem('user_id', userData.id);
            }
            
            // Check if user has completed onboarding
            if (userData.has_candidate_profile && userData.candidate_id) {
              // User has completed onboarding, redirect to dashboard
              console.log('User has completed onboarding, redirecting to dashboard');
              const userId = userData.id || '';
              setTimeout(() => {
                router.push(`/dashboard?user_id=${userId}`);
              }, 2000);
              return;
            } else {
              // User hasn't completed onboarding, redirect to onboarding
              console.log('User needs to complete onboarding, redirecting to onboarding');
              const userId = userData.id || '';
              setTimeout(() => {
                router.push(`/onboarding/candidate?user_id=${userId}`);
              }, 2000);
              return;
            }
          }
        } catch (profileError) {
          console.warn('Profile fetch failed, redirecting to onboarding:', profileError);
        }

        // If profile check failed, default to onboarding
        console.log('Profile check failed, defaulting to onboarding');
        setTimeout(() => {
          router.push('/onboarding/candidate');
        }, 2000);

      } catch (error) {
        console.error('Auth success error:', error);
        setError(error.message || 'Authentication failed');
        setIsProcessing(false);
      }
    };

    handleAuthSuccess();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gray-50 overflow-hidden pt-36">
        {/* Hero Background */}
        <div
          className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('/images/backgr.jpg')" }}
          aria-hidden="true"
        ></div>
        {/* Error Message */}
        <div className="relative z-20 bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Authentication Failed</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/login-user')}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 overflow-hidden pt-36">
      {/* Hero Background */}
      <div
        className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/backgr.jpg')" }}
        aria-hidden="true"
      ></div>
      {/* Success Message */}
      <div className="relative z-20 bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <DotLottieReact
            src="https://lottie.host/7621e46c-7570-4fe8-a948-4a6cdf30fe46/gdRAeAo5k4.lottie"
            loop
            autoplay
            style={{ width: '200px', height: '200px' }}
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-green-600">Authentication Successful!</h2>
        <p className="text-gray-600 mb-4">You have been successfully authenticated with Google.</p>
        <p className="text-sm text-gray-500">Redirecting to onboarding...</p>
      </div>
    </div>
  );
} 