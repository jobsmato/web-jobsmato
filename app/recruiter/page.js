"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';

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

export default function RecruiterPage() {
  console.log('RecruiterPage component is being rendered');
  
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    callConnected: false,
    interested: false,
    otherSource: "",
    remark: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [candidateId, setCandidateId] = useState("");
  const [showOtherSource, setShowOtherSource] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [enrollmentData, setEnrollmentData] = useState({
    userId: null,
    recruiterId: null,
    candidateId: null,
    leadId: null
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      // Get the recruiter's token and user info
      const token = localStorage.getItem('access_token');
      const userType = localStorage.getItem('user_type');
      
      if (!token || userType !== 'recruiter') {
        throw new Error('Recruiter authentication required');
      }
      
      // Get recruiter's user ID from the token or API
      let recruiterUserId = 0;
      try {
        const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.ME), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          recruiterUserId = userData.id || 0;
        }
      } catch (error) {
        console.warn('Could not fetch recruiter user ID:', error);
      }
      
      // Check if email already exists in leads
      try {
        const emailCheckResponse = await fetch(buildApiUrl(API_ENDPOINTS.LEADS.CHECK_EMAIL(form.email)), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
          },
        });
        
        if (emailCheckResponse.ok) {
          const emailCheckData = await emailCheckResponse.json();
          if (emailCheckData.exists) {
            throw new Error(`A lead with email '${form.email}' already exists (Lead ID: ${emailCheckData.lead_id})`);
          }
        }
      } catch (error) {
        if (error.message.includes('already exists')) {
          throw error; // Re-throw the duplicate email error
        }
        console.warn('Could not check email existence:', error);
        // Continue with lead creation if email check fails
      }
      
      // Create user if candidate is interested and connected on call
      let candidateUserId = 0;
      if (form.callConnected && form.interested) {
        try {
          // Split name into first and last name
          const nameParts = form.name.trim().split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          
          const userData = {
            email: form.email,
            first_name: firstName,
            last_name: lastName,
            phone: form.phone,
            source: "api",
            user_type: "user",
            allow_communication: true
          };
          
          const createUserResponse = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.CREATE_USER), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
            },
            body: JSON.stringify(userData)
          });
          
          if (!createUserResponse.ok) {
            const errorData = await createUserResponse.json();
            throw new Error(errorData.detail || 'Failed to create user');
          }
          
          const createUserResult = await createUserResponse.json();
          console.log('User creation response:', createUserResult);
          
          // Try different possible field names for user ID
          candidateUserId = createUserResult.id || createUserResult.user_id || createUserResult.userId || 0;
          console.log('Extracted candidate user ID:', candidateUserId);
          
          // Store the user ID for display
          setEnrollmentData(prev => ({
            ...prev,
            userId: candidateUserId
          }));
          
        } catch (error) {
          console.error('Error creating user:', error);
          throw new Error(`Failed to create user: ${error.message}`);
        }
      }
      
      // Prepare lead data
      const leadData = {
        name: form.name,
        phone: form.phone,
        source: form.source === "Other" ? form.otherSource : form.source,
        email: form.email,
        connected_on_call: form.callConnected,
        interested: form.interested,
        remarks: form.remark || "",
        recruiter_user_id: recruiterUserId,
        enrolled_or_not: form.callConnected && form.interested,
        filled_candidate_or_not: false
      };
      
      // Add user_id only if user was created
      if (candidateUserId > 0) {
        leadData.user_id = candidateUserId;
        console.log('Added user_id to lead data:', candidateUserId);
      } else {
        console.log('No user_id added to lead data (candidateUserId = 0)');
      }
      
      console.log('Final lead data:', leadData);
      
      // Call the leads API
              const leadsResponse = await fetch(buildApiUrl(API_ENDPOINTS.LEADS.CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        },
        body: JSON.stringify(leadData)
      });
      
      if (!leadsResponse.ok) {
        const errorData = await leadsResponse.json();
        throw new Error(errorData.detail || 'Failed to create lead');
      }
      
      const leadResult = await leadsResponse.json();
      console.log('Lead created successfully:', leadResult);
      
      // Store all IDs for display
      setEnrollmentData(prev => ({
        ...prev,
        recruiterId: recruiterUserId,
        leadId: leadResult.id || leadResult.lead_id || 0
      }));
      
      // Generate candidate ID and update state
    const id = generateCandidateId();
    setCandidateId(id);
      
      // Store candidate ID for display
      setEnrollmentData(prev => ({
        ...prev,
        candidateId: id
      }));
      
    setSubmitted(true);
      
    if (form.callConnected && form.interested) {
      setSignedUp(true);
      signUpCandidate({ ...form, candidateId: id });
    } else {
      setSignedUp(false);
      storeCandidateInfo({ ...form, candidateId: id });
      }
      
    } catch (error) {
      console.error('Error during enrollment:', error);
      setError(error.message || 'Enrollment failed. Please try again.');
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
      <div className="relative z-20 bg-white shadow-md rounded p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Enroll Candidate</h2>
        {submitted ? (
          <div className="text-center flex flex-col items-center gap-2">
            {signedUp ? (
              <div className="mb-4 text-green-600 font-semibold">
                <div className="text-lg font-bold mb-2">Candidate Signed Up!</div>
                <div className="text-sm space-y-1">
                  <div><span className="font-semibold">User ID:</span> {enrollmentData.userId || 'N/A'}</div>
                  <div><span className="font-semibold">Recruiter ID:</span> {enrollmentData.recruiterId || 'N/A'}</div>
                  <div><span className="font-semibold">Candidate ID:</span> {enrollmentData.candidateId || 'N/A'}</div>
                  <div><span className="font-semibold">Lead ID:</span> {enrollmentData.leadId || 'N/A'}</div>
                </div>
              </div>
            ) : (
              <div className="mb-4 text-yellow-600 font-semibold">
                <div className="text-lg font-bold mb-2">Candidate info stored for follow-up.</div>
                <div className="text-sm space-y-1">
                  <div><span className="font-semibold">User ID:</span> {enrollmentData.userId || 'N/A'}</div>
                  <div><span className="font-semibold">Recruiter ID:</span> {enrollmentData.recruiterId || 'N/A'}</div>
                  <div><span className="font-semibold">Candidate ID:</span> {enrollmentData.candidateId || 'N/A'}</div>
                  <div><span className="font-semibold">Lead ID:</span> {enrollmentData.leadId || 'N/A'}</div>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3 justify-center items-center w-full max-w-xs mx-auto">
              <button className="bg-primary text-white px-4 py-2 rounded w-full" onClick={() => {
                setSubmitted(false);
                setEnrollmentData({
                  userId: null,
                  recruiterId: null,
                  candidateId: null,
                  leadId: null
                });
              }}>
                Enroll Another
              </button>
              {signedUp && (
                <>
                  <a href={`/onboarding/candidate?user_id=${enrollmentData.userId}`} className="bg-primary text-white px-4 py-2 rounded w-full flex items-center justify-center" target="_blank" rel="noopener noreferrer">
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
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
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
              className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enrolling..." : "Enroll Candidate"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 