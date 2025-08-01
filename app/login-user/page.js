"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

// API call for user login
async function loginUser(credentials) {
  try {
    const formData = new URLSearchParams();
    formData.append('grant_type', '');
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    formData.append('scope', '');
    formData.append('client_id', '');
    formData.append('client_secret', '');

    const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export default function LoginUser() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
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
    const password = formData.get('password');
    
    try {
      // Call the login API
      const response = await loginUser({ email, password });
      
      console.log("Login successful:", response);
      
      // Store the access token and user_id if needed
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_type', 'user');
        if (response.user_id) {
          localStorage.setItem('user_id', response.user_id);
        }
        
        // Dispatch login event for other components
        window.dispatchEvent(new Event('userLogin'));
      }
      
      // Redirect to dashboard with user_id
      const userId = response.user_id || '';
      router.push(`/dashboard?user_id=${userId}`);
      
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 overflow-hidden">
      {/* Hero Background */}
      <div
        className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/backgr.jpg')" }}
        aria-hidden="true"
      ></div>
      {/* Overlay for readability */}
      {/* Login Form */}
      <div className="relative z-20 bg-white p-8 rounded shadow-md w-full max-w-sm">
        {/* Toggle Navigation */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <Link href="/login-user" className="flex-1 text-center py-2 px-4 bg-primary text-white rounded-md">
            User Login
          </Link>
          <Link href="/signup-user" className="flex-1 text-center py-2 px-4 text-gray-600 hover:text-gray-800">
            User Signup
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input className="w-full px-3 py-2 border rounded" type="email" id="email" name="email" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input className="w-full px-3 py-2 border rounded" type="password" id="password" name="password" required />
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
            {isSubmitting ? "Logging in..." : "Login as User"}
          </button>
        </form>
        {/* Social Login Buttons */}
        <div className="my-4 flex flex-col gap-2">
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 bg-white hover:bg-gray-50"
            onClick={handleGoogleLogin}
          >
            <img src="/images/google.svg" alt="Google" className="h-5 w-5" />
            <span>Login with Google</span>
          </button>
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
            disabled
          >
            <img src="/images/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
            <span>Login with LinkedIn</span>
          </button>
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
            disabled
          >
            <img src="/images/facebook.svg" alt="Facebook" className="h-5 w-5" />
            <span>Login with Facebook</span>
          </button>
        </div>
        {/* Signup Link */}
        <div className="text-center">
          <p className="text-gray-600">Don't have an account? <Link href="/signup-user" className="text-primary hover:text-primary/80">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
} 