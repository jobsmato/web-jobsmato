// This is the recruiter candidate enrollment page, not the dashboard.
"use client";
import React, { useState } from "react";

// Mock database storage
function storeCandidateInfo(candidate) {
  // Simulate storing in DB
  console.log("Candidate info stored:", candidate);
}
// Mock signup function
function signUpCandidate(candidate) {
  // Simulate signup
  console.log("Candidate signed up:", candidate);
}
// Helper to generate a fake candidateId
function generateCandidateId() {
  return Math.random().toString(36).substring(2, 10);
}

export default function RecruiterEnrollCandidate() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    callConnected: false,
    interested: false,
    otherSource: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [candidateId, setCandidateId] = useState("");
  const [showOtherSource, setShowOtherSource] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "source") {
      setShowOtherSource(value === "Other");
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = generateCandidateId();
    setCandidateId(id);
    setSubmitted(true);
    if (form.callConnected && form.interested) {
      setSignedUp(true);
      signUpCandidate({ ...form, candidateId: id });
    } else {
      setSignedUp(false);
      storeCandidateInfo({ ...form, candidateId: id });
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
      <div className="relative z-20 bg-white shadow-md rounded p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Enroll Candidate</h2>
        {submitted ? (
          <div className="text-center flex flex-col items-center gap-2">
            {signedUp ? (
              <div className="mb-4 text-green-600 font-semibold">Candidate Signed Up!<br/>Candidate ID: {candidateId}</div>
            ) : (
              <div className="mb-4 text-yellow-600 font-semibold">Candidate info stored for follow-up.<br/>Candidate ID: {candidateId}</div>
            )}
            <div className="flex flex-col gap-3 justify-center items-center w-full max-w-xs mx-auto">
              <button className="bg-primary text-white px-4 py-2 rounded w-full" onClick={() => setSubmitted(false)}>
                Enroll Another
              </button>
              {signedUp && (
                <>
                  <a href={`/candidate`} className="bg-primary text-white px-4 py-2 rounded w-full flex items-center justify-center" target="_blank" rel="noopener noreferrer">
                    Go to Candidate Onboarding
                  </a>
                  <button className="bg-primary text-white px-4 py-2 rounded w-full flex items-center justify-center" type="button">
                    Send Welcome Email
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
              <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="source">Source</label>
              <select
                className="w-full px-3 py-2 border rounded"
                id="source"
                name="source"
                value={form.source}
                onChange={handleChange}
                required
              >
                <option value="">Select source</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Naukri">Naukri</option>
                <option value="Indeed">Indeed</option>
                <option value="Other">Other</option>
              </select>
              {showOtherSource && (
                <input
                  className="w-full mt-2 px-3 py-2 border rounded"
                  type="text"
                  id="otherSource"
                  name="otherSource"
                  value={form.otherSource || ''}
                  onChange={handleChange}
                  placeholder="Please specify"
                />
              )}
            </div>
            <div className="mb-4 flex flex-row items-center gap-6 w-full">
              <div className="flex flex-col gap-4 flex-shrink-0 justify-center w-64">
                <div className="flex flex-row items-center justify-between w-full">
                  <span className="block text-gray-700">Connected on Call</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="callConnected"
                      checked={form.callConnected}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="group peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-12 h-6 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 after:top-0.5 after:left-0.5 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
                  </label>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <span className="block text-gray-700">Interested in Enrolling</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="interested"
                      checked={form.interested}
                      onChange={handleChange}
                      className="sr-only peer"
                      disabled={!form.callConnected}
                    />
                    <div className={`group peer ring-0 ${form.callConnected ? 'bg-rose-400' : 'bg-gray-300'} rounded-full outline-none duration-300 after:duration-300 w-12 h-6 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 after:top-0.5 after:left-0.5 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0`}></div>
                  </label>
                </div>
              </div>
              <div className="flex-1 flex items-center">
                <textarea
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px]"
                  id="remark"
                  name="remark"
                  value={form.remark}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Add remarks here..."
                />
              </div>
            </div>
            <button
              className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition"
              type="submit"
            >
              Enroll Candidate
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 