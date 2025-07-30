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

        // Store the token in localStorage
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_type', 'user'); // Default to user, you might want to determine this from the token or API call

        // Optional: Verify the token with your backend
        try {
          const response = await fetch('http://localhost:8000/api/v1/auth/verify-token', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            console.log('User data:', userData);
            
            // Store additional user information if needed
            if (userData.user_type) {
              localStorage.setItem('user_type', userData.user_type);
            }
            if (userData.email) {
              localStorage.setItem('user_email', userData.email);
            }
          }
        } catch (verifyError) {
          console.warn('Token verification failed, but continuing with stored token:', verifyError);
        }

        // Show success briefly, then redirect
        setTimeout(() => {
          // Redirect based on user type or default to user dashboard
          const userType = localStorage.getItem('user_type');
          if (userType === 'recruiter') {
            router.push('/recruiter/dashboard');
          } else {
            // For new users, redirect to onboarding first
            // You might want to check if user has completed onboarding
            router.push('/onboarding/candidate');
          }
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