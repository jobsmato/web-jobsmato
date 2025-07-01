"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Mock API call for sending welcome email
async function sendWelcomeEmail(email) {
  // Simulate API call
  console.log("Sending welcome email to:", email);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Welcome email sent successfully");
      resolve();
    }, 1000);
  });
}

export default function SignupUser() {
  const [showOther, setShowOther] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Get form data
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    try {
      // Here you would normally handle signup logic
      // For now, just simulate signup
      
      // Send welcome email
      await sendWelcomeEmail(email);
      
      // Show success message
      setShowSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/login-user");
      }, 3000);
      
    } catch (error) {
      console.error("Error during signup:", error);
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
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
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
          <Link href="/signup-user" className="flex-1 text-center py-2 px-4 bg-primary text-white rounded-md">
            User Signup
          </Link>
          <Link href="/signup-recruiter" className="flex-1 text-center py-2 px-4 text-gray-600 hover:text-gray-800">
            Recruiter Signup
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
          <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 bg-white hover:bg-gray-50">
            <img src="/images/google.svg" alt="Google" className="h-5 w-5" />
            <span>Sign up with Google</span>
          </button>
          <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 bg-white hover:bg-gray-50">
            <img src="/images/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
            <span>Sign up with LinkedIn</span>
          </button>
          <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 bg-white hover:bg-gray-50">
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