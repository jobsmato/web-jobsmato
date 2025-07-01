"use client";
import React from "react";
import Link from "next/link";

export default function RecruiterDashboard() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 overflow-hidden pt-32">
      {/* Hero Background */}
      <div
        className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/backgr.jpg')" }}
        aria-hidden="true"
      ></div>
      {/* Overlay for readability */}
      <div className="relative z-20 w-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Card 1: Enroll Candidate */}
          <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-600 dark:shadow-neutral-700/70 w-80">
            <img className="w-full h-auto rounded-t-xl" src="/images/people-working-call-center.jpg" alt="Card Image" />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Enroll Candidate
              </h3>
              <p className="mt-1 text-gray-500 dark:text-neutral-400">
                Add a new candidate to your recruitment pipeline.
              </p>
              <Link className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="/recruiter">
                Go to Enroll
              </Link>
            </div>
          </div>
          {/* Card 2: Placeholder */}
          {/* To enable this card, remove 'opacity-50 pointer-events-none' below */}
          <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-600 dark:shadow-neutral-700/70 w-80 opacity-50 pointer-events-none">
            <img className="w-full h-auto rounded-t-xl" src="/images/happy-male-candidate-handshaking-with-manager-after-successful-job-interview-office.jpg" alt="Card Image" />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Candidate Dashboard
              </h3>
              <p className="mt-1 text-gray-500 dark:text-neutral-400">
                View all the candidates enrolled.
              </p>
              <a className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
                Go to dashboard
              </a>
            </div>
          </div>
          {/* Card 3: Placeholder */}
          {/* To enable this card, remove 'opacity-50 pointer-events-none' below */}
          <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-600 dark:shadow-neutral-700/70 w-80 opacity-50 pointer-events-none">
            <img className="w-full h-auto rounded-t-xl" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80" alt="Card Image" />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Coming soon..
              </h3>
              <p className="mt-1 text-gray-500 dark:text-neutral-400">
                More feature coming soon.
              </p>
              <a className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 