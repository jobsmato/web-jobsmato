"use client";
import React, { useState } from "react";
import Banner from "../../layouts/components/Banner";

const faqData = [
  {
    question: "How do I create an account?",
    answer:
      'Creating an account is simple! Click on the "Sign Up" button at the top of the page, fill in your details, and you\'re all set to start your job search.',
  },
  {
    question: "Is it free to use the platform?",
    answer:
      "Yes, creating an account, searching for jobs, and applying to positions is completely free for job seekers.",
  },
  {
    question: "How do I upload my resume?",
    answer:
      'After logging in, go to your profile and click on "Upload Resume." You can upload your resume in PDF, Word, or other supported formats.',
  },
  {
    question: "How do I receive job recommendations?",
    answer:
      "Once you complete your profile, our system will match you with relevant job opportunities based on your skills, experience, and preferences. A dedicated HR will be assigned to you who will reach out to you with job opportunities, its details and training.",
  },
  {
    question: "Can I track my applications?",
    answer:
      "Yes, your HR assistance will keep you updated on the progress of your application.",
  },
  {
    question: "How do I contact employers?",
    answer:
      "Employers may reach out to you if they're interested in your profile.",
  },
  {
    question: "Can I apply for jobs outside my location?",
    answer:
      "Yes! Geography is not a problem.",
  },
  {
    question: "What if I need help or have additional questions?",
    answer:
      'Our support team is here for you. Reach out through our "Contact Us" page or email us at <a href="mailto:support@jobsmato.com" class="text-blue-600 underline">support@jobsmato.com</a>',
  },
];

export default function TermsPolicyPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <>
      <section className="section pt-[10rem]">
        <Banner title="FAQ" />
      </section>
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
              Frequently asked questions
            </h2>
          </div>
          <div className="accordion-group" data-accordion="default-accordion">
            {faqData.map((item, idx) => (
              <div
                key={idx}
                className={`accordion border border-solid border-gray-300 p-4 rounded-xl transition duration-500 mb-8 lg:p-4 ${openIndex === idx ? 'bg-indigo-50 border-indigo-600' : ''}`}
                id={`basic-heading-${idx}`}
              >
                <button
                  className={`accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 ${openIndex === idx ? 'font-medium text-indigo-600' : ''}`}
                  aria-controls={`basic-collapse-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                >
                  <h5>{item.question}</h5>
                  {/* Plus icon */}
                  <svg
                    className={`w-6 h-6 text-gray-900 transition duration-500 block ${openIndex === idx ? 'hidden' : ''} group-hover:text-indigo-600`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12H18M12 18V6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  {/* Minus icon */}
                  <svg
                    className={`w-6 h-6 text-gray-900 transition duration-500 ${openIndex === idx ? 'block' : 'hidden'} group-hover:text-indigo-600`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12H18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <div
                  id={`basic-collapse-${idx}`}
                  className="accordion-content w-full overflow-hidden pr-4"
                  aria-labelledby={`basic-heading-${idx}`}
                  style={{ maxHeight: openIndex === idx ? 250 : 0, transition: 'max-height 0.5s', }}
                >
                  <p className="text-base text-gray-900 font-normal leading-6" dangerouslySetInnerHTML={{ __html: item.answer }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 