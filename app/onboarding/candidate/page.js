'use client';

import React, { useReducer, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRightIcon, CheckCircleIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { UserIcon, BriefcaseIcon, AcademicCapIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

// Modern styling with better visual hierarchy
const containerStyles = "max-w-2xl mx-auto px-6 py-4";
const cardStyles = "bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-6";
const questionStyles = "text-2xl font-bold text-gray-900 mb-2";
const subtitleStyles = "text-gray-600 mb-8 text-lg";
const optionCardStyles = "group cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105";
const selectedCardStyles = "border-indigo-500 bg-indigo-50 shadow-lg";
const unselectedCardStyles = "border-gray-200 hover:border-indigo-300";
const inputStyles = "w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-0 transition-all duration-300";
const buttonStyles = "inline-flex items-center px-8 py-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl";

// Wizard state management (same as before)
const onboardingSteps = {
  choose: [
    { key: 'workStatus', title: 'Work Status' }
  ],
  experienced: [
    { key: 'workStatus', title: 'Work Status' },
    { key: 'isEmployed', title: 'Employment Status' },
    { key: 'workExperience', title: 'Work Experience' },
    { key: 'companyRole', title: 'Company & Role' },
    { key: 'duration', title: 'Duration' },
    { key: 'compensation', title: 'Compensation & Notice' }
  ],
  fresher: [
    { key: 'workStatus', title: 'Work Status' },
    { key: 'education', title: 'Education Details' }
  ]
};

const initialState = {
  stepIndex: 0,
  answers: {},
  errors: {},
  mode: 'choose',
  isLastStep: false,
};

function onboardingReducer(state, action) {
  switch (action.type) {
    case 'SET_ANSWER':
      const answers = { ...state.answers, ...action.payload };
      let mode = state.mode;
      
      if (action.payload.workStatus) {
        mode = action.payload.workStatus === 'fresher' ? 'fresher' : 'experienced';
      }
      
      const newStepIndex = Math.min(state.stepIndex + 1, onboardingSteps[mode].length - 1);
      return {
        ...state,
        answers,
        mode,
        stepIndex: newStepIndex,
        isLastStep: newStepIndex === onboardingSteps[mode].length - 1
      };
      
    case 'GO_BACK':
      return {
        ...state,
        stepIndex: Math.max(0, state.stepIndex - 1),
        isLastStep: Math.max(0, state.stepIndex - 1) === onboardingSteps[state.mode].length - 1
      };
      
    case 'UPDATE_FIELD':
      return {
        ...state,
        answers: { ...state.answers, ...action.payload }
      };
      
    case 'NEXT_STEP':
      const nextStepIndex = Math.min(state.stepIndex + 1, onboardingSteps[state.mode].length - 1);
      return {
        ...state,
        stepIndex: nextStepIndex,
        isLastStep: nextStepIndex === onboardingSteps[state.mode].length - 1
      };
      
    case 'LOAD_EXISTING_DATA':
      const loadedAnswers = action.payload;
      let loadedMode = 'choose';
      
      if (loadedAnswers.workStatus) {
        loadedMode = loadedAnswers.workStatus === 'fresher' ? 'fresher' : 'experienced';
      }
      
      // Determine the last completed step to show the user
      let lastCompletedStep = 0;
      if (loadedMode === 'fresher') {
        if (loadedAnswers.education?.degree && loadedAnswers.education?.course && 
            loadedAnswers.education?.university && loadedAnswers.education?.startYear && 
            loadedAnswers.education?.passingYear && loadedAnswers.education?.cgpa && 
            loadedAnswers.education?.skills) {
          lastCompletedStep = onboardingSteps[loadedMode].length - 1; // Show last step (education)
        }
      } else if (loadedMode === 'experienced') {
        const steps = onboardingSteps[loadedMode];
        for (let i = 0; i < steps.length; i++) {
          const stepKey = steps[i].key;
          let stepComplete = false;
          
          switch (stepKey) {
            case 'workStatus':
              stepComplete = !!loadedAnswers.workStatus;
              break;
            case 'isEmployed':
              stepComplete = loadedAnswers.isEmployed !== undefined;
              break;
            case 'workExperience':
              stepComplete = loadedAnswers.workExperience?.years !== undefined && 
                           loadedAnswers.workExperience?.months !== undefined;
              break;
            case 'companyRole':
              stepComplete = !!loadedAnswers.companyRole?.company && 
                           !!loadedAnswers.companyRole?.jobTitle && 
                           !!loadedAnswers.companyRole?.city;
              break;
            case 'duration':
              stepComplete = !!loadedAnswers.duration?.from;
              break;
            case 'compensation':
              stepComplete = !!loadedAnswers.compensation?.salary && 
                           !!loadedAnswers.compensation?.noticePeriod;
              break;
          }
          
          if (stepComplete) {
            lastCompletedStep = i;
          } else {
            break;
          }
        }
      }
      
      return {
        ...state,
        answers: loadedAnswers,
        mode: loadedMode,
        stepIndex: lastCompletedStep,
        isLastStep: lastCompletedStep === onboardingSteps[loadedMode].length - 1
      };
      
    default: 
      return state;
  }
}

// Modern Step Renderer with conversational UI
const ModernStepRenderer = ({ step, answer, onNext, onBack, isEmployed, canGoBack, onFieldUpdate, dispatch, isLastStep }) => {
  
  if (step.key === 'workStatus') {
    return (
      <div className={cardStyles}>
        {/* Back Button */}
        {canGoBack && (
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back
          </button>
        )}
        
        <h2 className={questionStyles}>👋 Let's get started!</h2>
        <p className={subtitleStyles}>First, tell us about your work experience</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { 
              value: 'fresher', 
              label: "I'm a fresher", 
              icon: <AcademicCapIcon className="w-10 h-10" />, 
              desc: "New to the workforce",
              emoji: "🎓"
            },
            { 
              value: 'experienced', 
              label: "I'm experienced", 
              icon: <BriefcaseIcon className="w-10 h-10" />, 
              desc: "I have work experience",
              emoji: "💼"
            }
          ].map(option => (
            <div
              key={option.value}
              onClick={() => onNext({ [step.key]: option.value })}
              className={`${optionCardStyles} ${answer === option.value ? selectedCardStyles : unselectedCardStyles}`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <span className="text-4xl">{option.emoji}</span>
                <h3 className="text-xl font-bold text-gray-900">{option.label}</h3>
                <p className="text-gray-600">{option.desc}</p>
                {answer === option.value && (
                  <CheckCircleIcon className="w-6 h-6 text-indigo-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step.key === 'isEmployed') {
    return (
      <div className={cardStyles}>
        {/* Back Button */}
        {canGoBack && (
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back
          </button>
        )}
        
        <h2 className={questionStyles}>💼 Are you currently working?</h2>
        <p className={subtitleStyles}>Let us know your current employment status</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: true, label: 'Yes, I am employed', emoji: '✅', desc: 'Currently working' },
            { value: false, label: 'No, I am not employed', emoji: '🔍', desc: 'Looking for opportunities' }
          ].map(option => (
            <div
              key={String(option.value)}
              onClick={() => onNext({ [step.key]: option.value })}
              className={`${optionCardStyles} ${answer === option.value ? selectedCardStyles : unselectedCardStyles}`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <span className="text-4xl">{option.emoji}</span>
                <h3 className="text-xl font-bold text-gray-900">{option.label}</h3>
                <p className="text-gray-600">{option.desc}</p>
                {answer === option.value && (
                  <CheckCircleIcon className="w-6 h-6 text-indigo-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step.key === 'workExperience') {
    return (
      <div className={cardStyles}>
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-4">
          {canGoBack && (
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          
          {!isLastStep && answer?.years !== undefined && answer?.months !== undefined && (
            <button
              onClick={() => {
                dispatch({ type: 'NEXT_STEP' });
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Next
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
        
        <h2 className={questionStyles}>⏰ How much experience do you have?</h2>
        <p className={subtitleStyles}>Tell us about your total work experience</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">Years</label>
            <select
              className={inputStyles}
              value={answer?.years || ''}
              onChange={(e) => onNext({ [step.key]: { ...answer, years: e.target.value }})}
            >
              <option value="">Select years</option>
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i}>{i} Year{i !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">Months</label>
            <select
              className={inputStyles}
              value={answer?.months || ''}
              onChange={(e) => onNext({ [step.key]: { ...answer, months: e.target.value }})}
            >
              <option value="">Select months</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i}>{i} Month{i !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
        
        {answer?.years !== undefined && answer?.months !== undefined && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
            <p className="text-green-800 font-semibold">
              Total Experience: {answer.years} year{answer.years !== '1' ? 's' : ''} and {answer.months} month{answer.months !== '1' ? 's' : ''}
            </p>
          </div>
        )}
        
        {/* Continue Button */}
        {answer?.years !== undefined && answer?.months !== undefined && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                dispatch({ type: 'NEXT_STEP' });
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    );
  }

  if (step.key === 'companyRole') {
    return (
      <div className={cardStyles}>
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-4">
          {canGoBack && (
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          
          {!isLastStep && answer?.company && answer?.jobTitle && answer?.city && (
            <button
              onClick={() => {
                dispatch({ type: 'NEXT_STEP' });
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Next
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
        
        <h2 className={questionStyles}>🏢 Tell us about your current role</h2>
        <p className={subtitleStyles}>Help us understand your professional background</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              🏢 Company Name
            </label>
            <input
              type="text"
              placeholder="e.g. Google, Microsoft, Amazon"
              className={inputStyles}
              value={answer?.company || ''}
              onChange={(e) => onNext({ [step.key]: { ...answer, company: e.target.value }})}
            />
          </div>
          
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              👨‍💻 Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Software Developer, Marketing Manager"
              className={inputStyles}
              value={answer?.jobTitle || ''}
              onChange={(e) => onNext({ [step.key]: { ...answer, jobTitle: e.target.value }})}
            />
          </div>
          
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              📍 Current City
            </label>
            <input
              type="text"
              placeholder="e.g. New Delhi, Bangalore, Mumbai"
              className={inputStyles}
              value={answer?.city || ''}
              onChange={(e) => onNext({ [step.key]: { ...answer, city: e.target.value }})}
            />
          </div>
        </div>
        
        {/* Continue Button */}
        {answer?.company && answer?.jobTitle && answer?.city && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                dispatch({ type: 'NEXT_STEP' });
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    );
  }

  if (step.key === 'duration') {
    return (
      <div className={cardStyles}>
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-4">
          {canGoBack && (
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          
          {!isLastStep && answer?.from && (
            <button
              onClick={() => {
                dispatch({ type: 'NEXT_STEP' });
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Next
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
        
        <h2 className={questionStyles}>📅 When did you start working there?</h2>
        <p className={subtitleStyles}>Let us know your employment duration</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">From</label>
            <input
              type="month"
              className={inputStyles}
              value={answer?.from || ''}
              onChange={(e) => onNext({ [step.key]: { ...answer, from: e.target.value }})}
            />
          </div>
          
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">To</label>
            {isEmployed ? (
              <div className="relative">
                <input
                  type="text"
                  value="Present"
                  disabled
                  className={`${inputStyles} bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-800 font-semibold cursor-not-allowed`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-green-600">✨</span>
                </div>
              </div>
            ) : (
              <input
                type="month"
                className={inputStyles}
                value={answer?.to || ''}
                onChange={(e) => onNext({ [step.key]: { ...answer, to: e.target.value }})}
                placeholder="Select end date"
              />
            )}
          </div>
        </div>
        
        {!isEmployed && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
            <p className="text-blue-800 text-sm">
              💡 Select when you left this position
            </p>
          </div>
        )}
        
        {/* Continue Button */}
        {answer?.from && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                dispatch({ type: 'NEXT_STEP' });
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    );
  }

  if (step.key === 'compensation') {
    const noticePeriods = ["15 Days or less", "1 Month", "2 Months", "3 Months", "More than 3 Months"];
    
    return (
      <div className={cardStyles}>
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-4">
          {canGoBack && (
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          
          {!isLastStep && answer?.salary && answer?.noticePeriod && (
            <button
              onClick={() => {
                dispatch({ type: 'NEXT_STEP' });
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Next
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
        
        <h2 className={questionStyles}>💰 Let's talk compensation</h2>
        <p className={subtitleStyles}>Help us understand your expectations</p>
        
        <div className="space-y-8">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              💵 Annual Salary (CTC)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl font-bold text-gray-600">₹</span>
              <input
                type="number"
                placeholder="e.g. 800000"
                className={`${inputStyles} pl-12`}
                value={answer?.salary || ''}
                onChange={(e) => onNext({ [step.key]: { ...answer, salary: e.target.value }})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              ⏳ Notice Period
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {noticePeriods.map(period => (
                <button
                  key={period}
                  type="button"
                  onClick={() => onNext({ [step.key]: { ...answer, noticePeriod: period }})}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                    answer?.noticePeriod === period 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-900' 
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <span className="font-semibold">{period}</span>
                  {answer?.noticePeriod === period && (
                    <CheckCircleIcon className="w-5 h-5 text-indigo-600 float-right mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        

      </div>
    );
  }

  if (step.key === 'education') {
    const degrees = ['Graduation/Diploma', 'Post Graduation', '12th', '10th'];
    const courses = ['B.Sc', 'B.Tech', 'B.A', 'B.Com'];
    
    return (
      <div className={cardStyles}>
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-4">
          {canGoBack && (
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          
          {!isLastStep && answer?.degree && answer?.course && answer?.university && answer?.startYear && answer?.passingYear && answer?.cgpa && answer?.skills && (
            <button
              onClick={() => {
                dispatch({ type: 'NEXT_STEP' });
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Next
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
        
        <h2 className={questionStyles}>🎓 Tell us about your education</h2>
        <p className={subtitleStyles}>Share your academic background with us</p>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                📚 Highest Qualification
              </label>
              <select
                className={inputStyles}
                value={answer?.degree || ''}
                onChange={(e) => onFieldUpdate({ [step.key]: { ...answer, degree: e.target.value }})}
              >
                <option value="">Select qualification</option>
                {degrees.map(degree => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                📖 Course
              </label>
              <select
                className={inputStyles}
                value={answer?.course || ''}
                onChange={(e) => onFieldUpdate({ [step.key]: { ...answer, course: e.target.value }})}
              >
                <option value="">Select course</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              🏫 University/Institute
            </label>
            <input
              type="text"
              placeholder="e.g. Delhi University, IIT Delhi"
              className={inputStyles}
              value={answer?.university || ''}
              onChange={(e) => onFieldUpdate({ [step.key]: { ...answer, university: e.target.value }})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                📅 Start Year
              </label>
              <select
                className={inputStyles}
                value={answer?.startYear || ''}
                onChange={(e) => onFieldUpdate({ [step.key]: { ...answer, startYear: e.target.value }})}
              >
                <option value="">Select year</option>
                {[...Array(8)].map((_, i) => {
                  const year = 2018 + i;
                  return <option key={year} value={year}>{year}</option>
                })}
              </select>
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                🎯 End Year
              </label>
              <select
                className={inputStyles}
                value={answer?.passingYear || ''}
                onChange={(e) => onFieldUpdate({ [step.key]: { ...answer, passingYear: e.target.value }})}
              >
                <option value="">Select year</option>
                {[...Array(8)].map((_, i) => {
                  const year = 2021 + i;
                  return <option key={year} value={year}>{year}</option>
                })}
              </select>
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                ⭐ CGPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                placeholder="e.g. 8.5"
                className={inputStyles}
                value={answer?.cgpa || ''}
                onChange={(e) => onFieldUpdate({ [step.key]: { ...answer, cgpa: e.target.value }})}
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              🚀 Key Skills
            </label>
            <input
              type="text"
              placeholder="e.g. JavaScript, React, Node.js, Python (separate with commas)"
              className={inputStyles}
              value={answer?.skills || ''}
              onChange={(e) => onFieldUpdate({ [step.key]: { ...answer, skills: e.target.value }})}
            />
            <p className="mt-2 text-sm text-gray-600">
              💡 Add skills that showcase your expertise
            </p>
          </div>
        </div>
        

      </div>
    );
  }

  return null;
};

const CandidateOnboarding = ({ data = { frontmatter: { title: 'Candidate Onboarding' } } }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;
  
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
  const [loading, setLoading] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [originalData, setOriginalData] = React.useState(null);
  const [dataModified, setDataModified] = React.useState(false);
  const router = useRouter();

  // Load existing onboarding data on component mount
  React.useEffect(() => {
    const loadExistingData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        let candidateId = localStorage.getItem('candidate_id');
        
        console.log('Loading existing data - Token:', !!token, 'Candidate ID:', candidateId);
        
        if (!token) {
          console.log('No token found, skipping data load');
          setInitialLoading(false);
          return;
        }
        
        // If no candidate_id in localStorage, try to get it from user profile
        if (!candidateId) {
          console.log('No candidate_id in localStorage, trying to get from user profile');
          try {
            const profileRes = await fetch('http://localhost:8000/api/v1/auth/me', {
              method: 'GET',
              headers: { 
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json'
              }
            });
            
            if (profileRes.ok) {
              const profileData = await profileRes.json();
              console.log('User profile data:', profileData);
              
              // Use candidate_id specifically, not user id
              candidateId = profileData.candidate_id;
              console.log('Got candidate_id from profile:', candidateId);
              
              if (candidateId) {
                localStorage.setItem('candidate_id', candidateId);
                console.log('Stored candidate_id in localStorage:', candidateId);
              } else {
                console.log('No candidate_id found in profile, user may not have candidate profile yet');
              }
            }
          } catch (profileError) {
            console.error('Error getting user profile:', profileError);
          }
        }
        
        if (!candidateId) {
          console.log('No candidate_id available, showing empty form for new candidate');
          setInitialLoading(false);
          return;
        }
        
        console.log('Attempting to load onboarding data for candidate_id:', candidateId);
        
        const res = await fetch(`http://localhost:8000/api/v1/candidates/${candidateId}/onboarding`, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          console.log('Loaded existing onboarding data:', data);
          
          // Set the loaded data to state
          console.log('Dispatching LOAD_EXISTING_DATA with payload:', data);
          dispatch({ type: 'LOAD_EXISTING_DATA', payload: data });
          setOriginalData(JSON.parse(JSON.stringify(data))); // Deep copy for comparison
          setDataLoaded(true);
          
          // Also log the state after dispatch
          setTimeout(() => {
            console.log('State after loading data:', state);
          }, 100);
        } else if (res.status === 404) {
          console.log('No onboarding data found for candidate_id:', candidateId, '- showing empty form');
          // Remove the candidate_id since no onboarding data exists
          localStorage.removeItem('candidate_id');
        } else {
          console.log('Error loading onboarding data:', res.status, res.statusText);
        }
      } catch (error) {
        console.error('Error loading existing data:', error);
      } finally {
        setInitialLoading(false);
      }
    };
    
    loadExistingData();
  }, []);
  
  // Debug effect to log state changes
  React.useEffect(() => {
    if (dataLoaded) {
      console.log('State updated after data load:', state);
      console.log('Current step:', state.stepIndex);
      console.log('Current mode:', state.mode);
      console.log('Current answers:', state.answers);
    }
  }, [state, dataLoaded]);
  
  // Track data modifications
  React.useEffect(() => {
    if (originalData && dataLoaded) {
      const changed = hasDataChanged();
      setDataModified(changed);
      console.log('Data modified:', changed);
    }
  }, [state.answers, originalData, dataLoaded]);

  const handleNext = (payload = {}) => {
    // For selection steps (workStatus, isEmployed), proceed to next step immediately
    const currentStepKey = onboardingSteps[state.mode][state.stepIndex]?.key;
    if (currentStepKey === 'workStatus' || currentStepKey === 'isEmployed') {
      dispatch({ type: 'SET_ANSWER', payload });
      // Smooth scroll to next section
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      return;
    }
    
    // For multi-field steps, just update the field without advancing
    dispatch({ type: 'UPDATE_FIELD', payload });
  };

  const handleBack = () => {
    dispatch({ type: 'GO_BACK' });
    // Smooth scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleFieldUpdate = (payload = {}) => {
    // Just update the answer without advancing to next step
    dispatch({ type: 'SET_ANSWER', payload });
  };

  const checkStepCompletion = (stepKey, answers) => {
    switch (stepKey) {
      case 'workExperience':
        return answers.workExperience?.years !== undefined && 
               answers.workExperience?.months !== undefined;
      
      case 'companyRole':
        return answers.companyRole?.company && 
               answers.companyRole?.jobTitle && 
               answers.companyRole?.city;
      
      case 'duration':
        return answers.duration?.from;
      
      case 'compensation':
        return answers.compensation?.salary && 
               answers.compensation?.noticePeriod;
      
      case 'education':
        return answers.education?.degree && 
               answers.education?.course && 
               answers.education?.university && 
               answers.education?.startYear && 
               answers.education?.passingYear && 
               answers.education?.cgpa && 
               answers.education?.skills;
      
      default:
        return false;
    }
  };

  const validateCurrentStep = () => {
    const currentStep = onboardingSteps[state.mode][state.stepIndex];
    
    if (currentStep.key === 'workStatus') {
      // For work status, we don't need validation since clicking the option should proceed
      return true;
    } else if (currentStep.key === 'education') {
      const education = state.answers.education || {};
      if (!education.degree || !education.course || !education.university || 
          !education.startYear || !education.passingYear || !education.cgpa || !education.skills) {
        alert('Please fill in all education fields before proceeding.');
        return false;
      }
    } else if (currentStep.key === 'isEmployed') {
      // For employment status, we don't need validation since clicking the option should proceed
      return true;
    } else if (currentStep.key === 'workExperience') {
      const experience = state.answers.workExperience || {};
      if (experience.years === undefined || experience.months === undefined) {
        alert('Please fill in your work experience before proceeding.');
        return false;
      }
    } else if (currentStep.key === 'companyRole') {
      const role = state.answers.companyRole || {};
      if (!role.company || !role.jobTitle || !role.city) {
        alert('Please fill in all company and role details before proceeding.');
        return false;
      }
    } else if (currentStep.key === 'duration') {
      const duration = state.answers.duration || {};
      if (!duration.from) {
        alert('Please fill in the duration details before proceeding.');
        return false;
      }
    } else if (currentStep.key === 'compensation') {
      const compensation = state.answers.compensation || {};
      if (!compensation.salary || !compensation.noticePeriod) {
        alert('Please fill in all compensation details before proceeding.');
        return false;
      }
    }
    
    return true;
  };

  const hasDataChanged = () => {
    if (!originalData) return true; // If no original data, consider it changed
    return JSON.stringify(state.answers) !== JSON.stringify(originalData);
  };

  const validateOnboardingData = (data) => {
    const errors = [];
    
    if (!data.workStatus) {
      errors.push('workStatus is required');
    }
    
    if (data.workStatus === 'experienced') {
      if (data.isEmployed === undefined) {
        errors.push('isEmployed is required for experienced candidates');
      }
      
      if (!data.workExperience?.years || !data.workExperience?.months) {
        errors.push('workExperience years and months are required');
      }
      
      if (!data.companyRole?.company || !data.companyRole?.jobTitle || !data.companyRole?.city) {
        errors.push('companyRole company, jobTitle, and city are required');
      }
      
      if (!data.duration?.from) {
        errors.push('duration from date is required');
      }
      
      if (!data.compensation?.salary || !data.compensation?.noticePeriod) {
        errors.push('compensation salary and noticePeriod are required');
      }
    }
    
    if (data.workStatus === 'fresher') {
      if (!data.education?.degree || !data.education?.course || !data.education?.university || 
          !data.education?.startYear || !data.education?.passingYear || !data.education?.cgpa || !data.education?.skills) {
        errors.push('all education fields are required for fresher candidates');
      }
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if data has actually changed
    if (!hasDataChanged()) {
      console.log('No changes detected, redirecting to dashboard');
      router.push('/candidate/dashboard');
      return;
    }
    
    setLoading(true);
    
    try {
      // Get the access token from localStorage
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('No access token found. Please login again.');
      }
      
      console.log('Submitting onboarding data:', state.answers);
      
      // Validate data before sending
      const validationErrors = validateOnboardingData(state.answers);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }
      
      // Validate and clean the data before sending
      const cleanedData = { ...state.answers };
      
      // Ensure all string values are properly formatted
      if (cleanedData.workExperience) {
        if (cleanedData.workExperience.years !== undefined) {
          cleanedData.workExperience.years = String(cleanedData.workExperience.years);
        }
        if (cleanedData.workExperience.months !== undefined) {
          cleanedData.workExperience.months = String(cleanedData.workExperience.months);
        }
      }
      
      if (cleanedData.compensation && cleanedData.compensation.salary) {
        cleanedData.compensation.salary = String(cleanedData.compensation.salary);
      }
      
      if (cleanedData.education) {
        if (cleanedData.education.startYear) {
          cleanedData.education.startYear = String(cleanedData.education.startYear);
        }
        if (cleanedData.education.passingYear) {
          cleanedData.education.passingYear = String(cleanedData.education.passingYear);
        }
        if (cleanedData.education.cgpa) {
          cleanedData.education.cgpa = String(cleanedData.education.cgpa);
        }
      }
      
      console.log('Cleaned data being sent:', cleanedData);
      
      // Check if candidate already has onboarding data
      const candidateId = localStorage.getItem('candidate_id');
      console.log('Current candidate_id in localStorage:', candidateId);
      let method = 'POST';
      let url = 'http://localhost:8000/api/v1/candidates/onboarding';
      
      // If we have a candidate_id, check if the candidate exists
      if (candidateId) {
        try {
          const checkRes = await fetch(`http://localhost:8000/api/v1/candidates/${candidateId}/onboarding`, {
            method: 'GET',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json'
            }
          });
          
          if (checkRes.ok) {
            // Candidate exists, use PUT for update
            method = 'PUT';
            url = `http://localhost:8000/api/v1/candidates/${candidateId}/onboarding`;
            console.log('Candidate exists, using PUT for update');
          } else if (checkRes.status === 404) {
            // Candidate doesn't exist, use POST for new
            console.log('Candidate onboarding not found, using POST for new submission');
            localStorage.removeItem('candidate_id'); // Remove invalid candidate_id
          } else {
            // Other error, use POST for new
            console.log('Error checking candidate, using POST for new submission');
            localStorage.removeItem('candidate_id');
          }
        } catch (checkError) {
          console.error('Error checking candidate existence:', checkError);
          // If check fails, use POST for new
          localStorage.removeItem('candidate_id');
        }
      }
      
              console.log(`Making ${method} request to:`, url);
        console.log('Request headers:', { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        });
        console.log('Request body:', cleanedData);
        
        const res = await fetch(url, {
          method: method,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
          },
          body: JSON.stringify(cleanedData)
        });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      
      if (!res.ok) {
        const errorData = await res.text();
        console.error('API Error Response:', errorData);
        
        // Try to parse as JSON for better error display
        try {
          const errorJson = JSON.parse(errorData);
          console.error('Parsed error details:', errorJson);
          
          // Format validation errors if they exist
          if (errorJson.detail && Array.isArray(errorJson.detail)) {
            const validationErrors = errorJson.detail.map(err => `${err.loc?.join('.')}: ${err.msg}`).join(', ');
            throw new Error(`Validation Error: ${validationErrors}`);
          } else if (errorJson.detail) {
            throw new Error(`API Error: ${errorJson.detail}`);
          } else {
            throw new Error(`API Error: ${res.status} - ${errorData}`);
          }
        } catch (parseError) {
          throw new Error(`API Error: ${res.status} - ${errorData}`);
        }
      }
      
      const responseData = await res.json();
      console.log('Success response:', responseData);
      
      // Store candidate_id if it's a new submission
      if (method === 'POST' && responseData.candidate_id) {
        localStorage.setItem('candidate_id', responseData.candidate_id);
        console.log('Stored new candidate_id:', responseData.candidate_id);
      } else if (method === 'PUT') {
        console.log('Updated existing candidate data');
      }
      
      // Redirect to candidate dashboard after successful onboarding
      router.push('/candidate/dashboard');
    } catch (e) {
      console.error('Onboarding submission error:', e);
      alert(`Submission failed: ${e.message}`);
      setLoading(false);
    }
  };

  const currentSteps = onboardingSteps[state.mode];
  const progressPercentage = currentSteps.length === 1 ? 5 : (state.stepIndex / (currentSteps.length - 1)) * 100;
  const currentStep = currentSteps[state.stepIndex];



  // Check if all required fields are filled
  const isAllFieldsFilled = () => {
    console.log('Current answers:', state.answers);
    console.log('Current mode:', state.mode);
    
    if (state.mode === 'fresher') {
      const educationFilled = Boolean(state.answers.education?.degree) && 
                             Boolean(state.answers.education?.course) && 
                             Boolean(state.answers.education?.university) && 
                             Boolean(state.answers.education?.startYear) && 
                             Boolean(state.answers.education?.passingYear) && 
                             Boolean(state.answers.education?.cgpa) && 
                             Boolean(state.answers.education?.skills);
      
      console.log('Education filled:', educationFilled);
      console.log('Education details:', state.answers.education);
      
      return Boolean(state.answers.workStatus) && educationFilled;
    } else if (state.mode === 'experienced') {
      return Boolean(state.answers.workStatus) && 
             state.answers.isEmployed !== undefined && 
             state.answers.workExperience?.years !== undefined && 
             state.answers.workExperience?.months !== undefined && 
             Boolean(state.answers.companyRole?.company) && 
             Boolean(state.answers.companyRole?.jobTitle) && 
             Boolean(state.answers.companyRole?.city) && 
             Boolean(state.answers.duration?.from) && 
             Boolean(state.answers.compensation?.salary) && 
             Boolean(state.answers.compensation?.noticePeriod);
    }
    return false;
  };

  // Show loading state while fetching existing data
  if (initialLoading) {
    return (
      <div className="min-h-screen overflow-hidden pt-36">
        <div
          className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1]"
          style={{ backgroundImage: "url('/images/backgr.jpg')" }}
          aria-hidden="true"
        ></div>
        <div className="text-center mt-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        </div>
        
        <div className={containerStyles}>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your onboarding data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden pt-36">

<div
        className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1]"
        style={{ backgroundImage: "url('/images/backgr.jpg')" }}
        aria-hidden="true"
      ></div>
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        {dataLoaded && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl max-w-md mx-auto">
            <p className="text-green-800 font-semibold">
              ✅ Your existing data has been loaded successfully!
            </p>
            <p className="text-green-700 text-sm mt-2">
              You are currently on step {state.stepIndex + 1} of {onboardingSteps[state.mode]?.length || 1}
            </p>
          </div>
        )}
      </div>
      
      <div className={containerStyles}>
        {/* Modern Progress Bar */}
        <div className="mb-0">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-indigo-600">
              Step {state.stepIndex + 1} 
            </span>
            <span className="text-sm font-semibold text-indigo-600">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-blue-100 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          <ModernStepRenderer
            step={currentStep}
            answer={state.answers[currentStep.key]}
            onNext={handleNext}
            onBack={handleBack}
            onFieldUpdate={handleFieldUpdate}
            isEmployed={state.answers.isEmployed}
            canGoBack={state.stepIndex > 0}
            dispatch={dispatch}
            isLastStep={state.isLastStep}
          />

          {/* Submit Button */}
          {(() => {
            console.log('Last step:', state.isLastStep);
            console.log('All fields filled:', isAllFieldsFilled());
            return state.isLastStep && isAllFieldsFilled();
          })() && (
            <div className="text-center mt-8">
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  disabled={loading}
                  className={`${buttonStyles} ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      {dataModified ? '🚀 Update Application' : '🚀 Submit Application'}
                      <ChevronRightIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
              <p className="mt-4 text-gray-600">
                We're excited to learn more about you! 🎉
              </p>
            </div>
          )}
          
          {/* Show message when on last step but fields not complete */}
          {state.isLastStep && !isAllFieldsFilled() && (
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Please complete all required fields to submit your application.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateOnboarding;
