"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';

// API call for user registration
async function registerUser(userData) {
  try {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.USER_SIGNUP), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export default function SignupUser() {
  const [showOther, setShowOther] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [allowCommunications, setAllowCommunications] = useState(true);
  const router = useRouter();

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.GOOGLE_OAUTH), {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Google login failed');
      }

      const data = await response.json();
      console.log('Google login response:', data);
      
      // Handle the response - redirect to Google OAuth URL
      if (data.auth_url) {
        window.location.href = data.auth_url;
      } else {
        throw new Error('No authentication URL received');
      }
      
    } catch (error) {
      console.error('Google login error:', error);
      setError('Google login failed. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    // Get form data
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const phone = formData.get('phone');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const source = formData.get('source') === 'Other' ? formData.get('otherSource') : formData.get('source');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Prepare user data for API
      const userData = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        source: source,
        allow_communication: allowCommunications,
        password: password,
        confirm_password: confirmPassword,
        user_type: "user"
      };
      
      // Call the registration API
      const response = await registerUser(userData);
      
      console.log("Registration successful:", response);
      
      // Store the access token and user_id if provided
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_type', 'user');
        if (response.user_id) {
          localStorage.setItem('user_id', response.user_id);
        }
        
        // Dispatch login event for other components
        window.dispatchEvent(new Event('userLogin'));
      }
      
      // Show success message
      setShowSuccess(true);
      
      // Redirect to onboarding with user_id after 3 seconds
      const userId = response.user_id || '';
      setTimeout(() => {
        router.push(`/onboarding/candidate?user_id=${userId}`);
      }, 3000);
      
    } catch (error) {
      console.error("Error during signup:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gray-50 overflow-hidden pt-32">
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
              style={{ width: '400px', height: '400px' }}
            />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-green-600">Signup Successful!</h2>
          <p className="text-gray-600 mb-4">Welcome email has been sent to your inbox.</p>
          <p className="text-sm text-gray-500">Redirecting to onboarding...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 overflow-hidden pt-32">
      {/* Hero Background */}
      <div
        className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/backgr.jpg')" }}
        aria-hidden="true"
      ></div>
      {/* Signup Form */}
      <div className="relative z-20 bg-white p-8 rounded shadow-md w-full max-w-xl">
        {/* Toggle Navigation */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <Link href="/login-user" className="flex-1 text-center py-2 px-4 text-gray-600 hover:text-gray-800">
            User Login
          </Link>
          <Link href="/signup-user" className="flex-1 text-center py-2 px-4 bg-primary text-white rounded-md">
            User Signup
          </Link>

        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">User Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input className="w-full px-3 py-2 border rounded" type="email" id="email" name="email" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
              <input className="w-full px-3 py-2 border rounded" type="tel" id="phone" name="phone" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="firstName">First Name</label>
              <input className="w-full px-3 py-2 border rounded" type="text" id="firstName" name="firstName" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="lastName">Last Name</label>
              <input className="w-full px-3 py-2 border rounded" type="text" id="lastName" name="lastName" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2" htmlFor="source">Source</label>
              <select className="w-full px-3 py-2 border rounded" id="source" name="source" required onChange={e => setShowOther(e.target.value === 'Other')}>
                <option value="">Select source</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Naukri">Naukri</option>
                <option value="Indeed">Indeed</option>
                <option value="Other">Other</option>
              </select>
              {showOther && (
                <input className="w-full mt-2 px-3 py-2 border rounded" type="text" id="otherSource" name="otherSource" placeholder="Please specify" />
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input className="w-full px-3 py-2 border rounded" type="password" id="password" name="password" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input className="w-full px-3 py-2 border rounded" type="password" id="confirmPassword" name="confirmPassword" required />
          </div>
          
          {/* Communication Preferences */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-3 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                checked={allowCommunications}
                onChange={(e) => setAllowCommunications(e.target.checked)}
              />
              <span className="text-gray-700">Allow to send communications via WhatsApp, email and SMS</span>
            </label>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <button 
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition mb-4 disabled:opacity-50" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Signup as User"}
          </button>
        </form>
        {/* Social Signup Buttons */}
        <div className="my-4 flex flex-col gap-2">
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 bg-white hover:bg-gray-50"
            onClick={handleGoogleLogin}
          >
            <img src="/images/google.svg" alt="Google" className="h-5 w-5" />
            <span>Sign up with Google</span>
          </button>
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
            disabled
          >
            <img src="/images/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
            <span>Sign up with LinkedIn</span>
          </button>
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
            disabled
          >
            <img src="/images/facebook.svg" alt="Facebook" className="h-5 w-5" />
            <span>Sign up with Facebook</span>
          </button>
        </div>
        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600">Already have an account? <Link href="/login-user" className="text-primary hover:text-primary/80">Login here</Link></p>
        </div>
      </div>
    </div>
  );
} 