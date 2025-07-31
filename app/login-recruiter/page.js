"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// API call for recruiter login
async function loginRecruiter(credentials) {
  try {
    const formData = new URLSearchParams();
    formData.append('grant_type', '');
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    formData.append('scope', '');
    formData.append('client_id', '');
    formData.append('client_secret', '');

    const response = await fetch('http://localhost:8000/api/v1/auth/login/recruiter', {
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

export default function LoginRecruiter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
      const response = await loginRecruiter({ email, password });
      
      console.log("Login successful:", response);
      
      // Store the access token if needed
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_type', 'recruiter');
        
        // Dispatch login event for other components
        window.dispatchEvent(new Event('userLogin'));
      }
      
      // Redirect to recruiter dashboard
    router.push("/recruiter/dashboard");
      
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

          <Link href="/login-recruiter" className="flex-1 text-center py-2 px-4 bg-primary text-white rounded-md">
            Recruiter Login
          </Link>
          <Link href="/signup-recruiter" className="flex-1 text-center py-2 px-4 text-gray-600 hover:text-gray-800">
          Recruiter Signup
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Recruiter Login</h2>
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
            {isSubmitting ? "Logging in..." : "Login as Recruiter"}
          </button>
        </form>
        {/* Signup Link */}
        <div className="text-center">
          <p className="text-gray-600">Don't have an account? <Link href="/signup-recruiter" className="text-primary hover:text-primary/80">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
} 