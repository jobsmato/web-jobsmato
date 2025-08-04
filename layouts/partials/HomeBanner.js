"use client";

import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import ImageFallback1 from "@layouts/components/ImageFallback1";
import IndiaMap from "@layouts/components/IndiaMap";
import useScreenSize from './ScreenSize';
import { useRouter } from "next/navigation";
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';



import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

import { useEffect, useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeBanner = ({ banner: bannerData, brands }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [fontSize, setFontSize] = useState("2rem"); // Default font size
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("Select State");

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", 
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setIsDropdownOpen(false);
    if (window.autoZoomToState) {
      window.autoZoomToState(state);
    }
  };

  const handleStateHover = (state) => {
    // Highlight state on map when hovering over dropdown option
    if (window.highlightStateOnMap) {
      window.highlightStateOnMap(state);
    }
  };

  const handleStateLeave = () => {
    // Remove highlight when leaving dropdown option
    if (window.removeStateHighlight) {
      window.removeStateHighlight();
    }
  };

  // Handle Need Job button click
  const handleNeedJob = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        // Get current user profile to check completion status
        const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.ME), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('User profile data:', userData);

          // Check if user has completed onboarding
          if (userData.has_candidate_profile && userData.candidate_id) {
            // User has completed onboarding, redirect to dashboard
            console.log('User has completed onboarding, redirecting to dashboard');
            router.push('/dashboard');
            return;
          } else {
            // User hasn't completed onboarding, redirect to onboarding
            console.log('User needs to complete onboarding, redirecting to onboarding');
            router.push('/onboarding/candidate');
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // If API call fails, default to onboarding
        router.push('/onboarding/candidate');
        return;
      }
    } else {
      // User is not logged in, redirect to login
      router.push('/login-user');
    }
  };

  useEffect(() => {
    setIsClient(true);
    
    // Load lottie-player script
    if (typeof window !== 'undefined' && !window.customElements.get('lottie-player')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
      script.async = true;
      document.head.appendChild(script);
    }
    
    // Adjust font size based on screen height
    const adjustFontSize = () => {
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;

      let calculatedFontSize = "4vh"; // Default value
      if (screenWidth > 540) {
        if (screenHeight < 700){
        calculatedFontSize = "4.5vh";
        }else if (screenHeight <600){
          calculatedFontSize = "6vh";
        }else if (screenHeight <500){
          calculatedFontSize = "5vh";
        }else if (screenHeight <500){
          calculatedFontSize = "5vh";
        }
      } else if (screenWidth > 640){
        calculatedFontSize = "10vh";
      }
      else if (screenWidth > 740){
        calculatedFontSize = "6vh";
      }

       else {
        calculatedFontSize = "4vh";
      }

      setFontSize(calculatedFontSize);
    };

    adjustFontSize(); // Initial adjustment
    window.addEventListener("resize", adjustFontSize);

    return () => window.removeEventListener("resize", adjustFontSize);
  }, []);

  useEffect(() => {
    const ctx2 = gsap.context(() => {
      const banner = document.querySelector(".banner");
      const bannerBg = document.querySelector(".banner-bg");
      const bannerContent = document.querySelector(".banner-content");
      const header = document.querySelector(".header");
      const tl = gsap.timeline();

      tl.fromTo(
        ".banner-title",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5 }
      )
        .fromTo(
          ".banner-btn",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          ">-0.4"
        )
        .fromTo(
          ".banner-img",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          ">-.5"
        );

      //parallax banner
      const parallaxTl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: () => `top ${header.clientHeight}`,
          scrub: true,
        },
      });

      const position = (banner.offsetHeight - bannerBg.offsetHeight) * 0.4;
      parallaxTl
        .fromTo(
          bannerBg,
          {
            y: 0,
          },
          {
            y: -position,
          }
        )
        .fromTo(
          bannerContent,
          {
            y: 0,
          },
          {
            y: -position,
          },
          "<"
        )
        .fromTo(
          ".banner-bg .circle",
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        );
    });

    return () => ctx2.revert();
  }, []);

  return (
    <>
      {/* Animation Keyframes */}
      <style>{`
        @keyframes state-jello-vertical {
          0% { transform: scale3d(1, 1, 1); }
          30% { transform: scale3d(0.75, 1.25, 1); }
          40% { transform: scale3d(1.25, 0.75, 1); }
          50% { transform: scale3d(0.85, 1.15, 1); }
          65% { transform: scale3d(1.05, 0.95, 1); }
          75% { transform: scale3d(0.95, 1.05, 1); }
          100% { transform: scale3d(1, 1, 1); }
        }
      `}</style>
      
<section className="section banner pt-0 w-full h-screen overflow-hidden relative">
  <div
    className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/images/backgr.jpg')",
    }}
  ></div>
  
  {/* Main Content Container */}
  <div className="container relative h-screen">

    {/* Floating Images at Line Starting Points */}
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block w-full h-full z-10 pointer-events-none">

      {/* Image 2 - At start of line to Rajasthan */}
              <ImageFallback1
        className="banner-img opacity-80 absolute rounded-lg w-16 h-20 animate-float-2 pointer-events-auto"
        src="/images/home2.jpg"
                    alt=""
        style={{
          left: 'calc(78% - 32px)',
          top: 'calc(28% - 40px)',
          animationDelay: '1s',
          animationDuration: '7s'
        }}
      />
      
      {/* Account Manager Label for Image 2 - Bottom Right */}
      <div 
        className="absolute bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 shadow-lg animate-float-2 pointer-events-auto"
        style={{
          left: 'calc(78% + 20px)',
          top: 'calc(28% + 30px)',
          animationDelay: '1s',
          animationDuration: '7s'
        }}
      >
        Account Manager
      </div>
      
      {/* Image 3 - At start of line to Karnataka */}
                  <ImageFallback1
        className="banner-img opacity-80 absolute rounded-lg w-16 h-20 animate-float-3 pointer-events-auto"
        src="/images/home3.jpg"
                    alt=""
        style={{
          left: 'calc(80% - 32px)',
          top: 'calc(65% - 40px)',
          animationDelay: '2s',
          animationDuration: '8s'
        }}
      />
      
      {/* Software Developer Label for Image 3 - Top Right */}
      <div 
        className="absolute bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 shadow-lg animate-float-3 pointer-events-auto"
        style={{
          left: 'calc(80% + 20px)',
          top: 'calc(65% - 70px)',
          animationDelay: '2s',
          animationDuration: '8s'
        }}
      >
        Software Developer
      </div>
      
      {/* Image 4 - At start of line to Gujarat */}
                  <ImageFallback1
        className="banner-img opacity-80 absolute rounded-lg w-16 h-20 animate-float-1 pointer-events-auto"
        src="/images/home4.jpg"
                    alt=""
        style={{
          left: 'calc(45% - 32px)',
          top: 'calc(35% - 40px)',
          animationDelay: '3s',
          animationDuration: '6.5s'
        }}
      />
      
      {/* Call Representative Label for Image 4 - Bottom Left */}
      <div 
        className="absolute bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 shadow-lg animate-float-1 pointer-events-auto"
        style={{
          left: 'calc(45% - 32px - 110px)',
          top: 'calc(35% + 30px)',
          animationDelay: '3s',
          animationDuration: '6.5s'
        }}
      >
        Call Representative
      </div>
      
      {/* Image 5 - At start of line to Kerala */}
                  <ImageFallback1
        className="banner-img opacity-80 absolute rounded-lg w-16 h-20 animate-float-2 pointer-events-auto"
                    src="/images/home5.jpg"
                    alt=""
        style={{
          left: 'calc(25% - 32px)',
          top: 'calc(25% - 40px)',
          animationDelay: '4s',
          animationDuration: '7.5s'
        }}
      />
      
      {/* AGM Label for Image 5 - Bottom Left */}
      <div 
        className="absolute bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 shadow-lg animate-float-2 pointer-events-auto"
        style={{
          left: 'calc(25% - 50px)',
          top: 'calc(25% + 30px)',
          animationDelay: '4s',
          animationDuration: '7.5s'
        }}
      >
        AGM
      </div>
      
      {/* Image 6 - At start of line to West Bengal */}
                  <ImageFallback1
        className="banner-img opacity-80 absolute rounded-lg w-16 h-20 animate-float-3 pointer-events-auto"
                    src="/images/home6.jpg"
                    alt=""
        style={{
          left: 'calc(55% - 32px)',
          top: 'calc(70% - 40px)',
          animationDelay: '5s',
          animationDuration: '8.5s'
        }}
      />
      
      {/* Sales Agent Label for Image 6 - Bottom Left */}
      <div 
        className="absolute bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 shadow-lg animate-float-3 pointer-events-auto"
        style={{
          left: 'calc(55% - 32px - 80px)',
          top: 'calc(70% + 30px)',
          animationDelay: '5s',
          animationDuration: '8.5s'
        }}
      >
        Sales Agent
      </div>
    </div>

    {/* Connecting Lines from Images to Map States */}
    <svg className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block w-full h-full pointer-events-none z-5" style={{ left: '0', top: '0', transform: 'none' }}>
      {/* Line from home2 (single direct line) to Rajasthan */}
      <g className="connection-line opacity-60">
        <line x1="78%" y1="28%" x2="60%" y2="35%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="2.5s" repeatCount="indefinite"/>
        </line>
        <circle cx="60%" cy="35%" r="3" fill="#3b82f6" className="animate-ping"/>
      </g>

      {/* Line from home3 (single direct line) to Karnataka */}
      <g className="connection-line opacity-60">
        <line x1="80%" y1="65%" x2="68%" y2="58%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="3s" repeatCount="indefinite"/>
        </line>
        <circle cx="68%" cy="58%" r="3" fill="#3b82f6" className="animate-ping"/>
      </g>

      {/* Line from home4 (moved more right) to Gujarat */}
      <g className="connection-line opacity-60">
        <line x1="45%" y1="35%" x2="55%" y2="35%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="2.2s" repeatCount="indefinite"/>
        </line>
        <line x1="55%" y1="35%" x2="55%" y2="42%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="2.2s" repeatCount="indefinite"/>
        </line>
        <circle cx="55%" cy="42%" r="3" fill="#3b82f6" className="animate-ping"/>
      </g>

      {/* Line from home5 (moved up) to Kerala */}
      <g className="connection-line opacity-60">
        <line x1="25%" y1="25%" x2="35%" y2="25%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="2.8s" repeatCount="indefinite"/>
        </line>
        <line x1="35%" y1="25%" x2="62%" y2="68%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="2.8s" repeatCount="indefinite"/>
        </line>
        <circle cx="62%" cy="68%" r="3" fill="#3b82f6" className="animate-ping"/>
      </g>

      {/* Line from home6 (single direct line) to West Bengal */}
      <g className="connection-line opacity-60">
        <line x1="55%" y1="70%" x2="75%" y2="48%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="2.3s" repeatCount="indefinite"/>
        </line>
        <circle cx="75%" cy="48%" r="3" fill="#3b82f6" className="animate-ping"/>
      </g>
    </svg>

    {/* Text Content - Moved Up and Left */}
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center text-center z-20 -ml-80 mt-20">
      <div className="banner-content space-y-4">
        <h1
          className="text-primary banner-title mb-0 text-3xl lg:text-4xl xl:text-5xl"
        >
          Your Career Journey,
        </h1>
        <h1
          className="text-primary banner-title mb-0 text-3xl lg:text-4xl xl:text-5xl"
        >
          Simplified!
        </h1>
        <div className="space-y-2 mt-4">
          <p className="font-sans text-grey text-base lg:text-lg">
            Discover thousands of opportunities tailored,
          </p>
          <p className="font-sans text-grey text-base lg:text-lg">
            to your skills and aspirations.
          </p>
        </div>

        <div className="banner-btn mt-5 relative flex justify-center" style={{ opacity: 1 }}>
          {/* Custom Dropdown Button with Glass Liquid Effect */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="select-state-btn transition-all duration-300 hover:select-state-btn-hover active:select-state-btn-active"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 24px',
              backgroundColor: '#006aff',
              border: '4px solid #c0dfff',
              color: 'white',
              gap: '6px',
              borderRadius: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              minWidth: '200px',
              position: 'relative',
              overflow: 'visible',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1b7aff';
              e.currentTarget.style.borderColor = '#b1d8ff';
              const svg = e.currentTarget.querySelector('.select-state-icon svg');
              if (svg) {
                svg.style.animation = 'none';
                svg.offsetHeight; // Force reflow
                svg.style.animation = 'state-jello-vertical 0.9s ease-in-out';
                svg.style.transformOrigin = 'left';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#006aff';
              e.currentTarget.style.borderColor = '#c0dfff';
              const svg = e.currentTarget.querySelector('.select-state-icon svg');
              if (svg) {
                svg.style.animation = 'none';
              }
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.borderWidth = '3px';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.borderWidth = '4px';
            }}
          >
            <span 
              className="select-state-text"
                             style={{
                 fontSize: '1.2em',
                 fontWeight: '600',
                 letterSpacing: '0.5px',
               }}
            >
              {selectedState}
            </span>
            <span 
              className="select-state-icon"
                             style={{
                 paddingTop: '3px',
                 height: '100%',
                 width: 'fit-content',
               }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="30"
                viewBox="0 0 38 15"
                fill="none"
                                 style={{
                   width: '35px',
                   height: '22px',
                 }}
              >
                <path
                  fill="white"
                  d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
                ></path>
              </svg>
            </span>
          </button>

          {/* Custom Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-[10000] max-h-48 overflow-hidden">
              <div className="max-h-48 overflow-y-auto">
                {states.map((state, index) => (
                  <div
                    key={index}
                    onClick={() => handleStateSelect(state)}
                    onMouseEnter={() => handleStateHover(state)}
                    onMouseLeave={handleStateLeave}
                    className="px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                  >
                    {state}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overlay to close dropdown when clicking outside */}
          {isDropdownOpen && (
            <div 
              className="fixed inset-0 z-[9999]" 
              onClick={() => setIsDropdownOpen(false)}
            />
          )}
        </div>
      </div>
    </div>

    {/* India Map - Background Right */}
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
      <div className="w-[800px] h-[700px] relative">
        <IndiaMap />
      </div>
</div>    

    {/* Mobile Layout */}
    <div className="lg:hidden flex flex-col justify-center items-center h-screen px-4">
      {/* Mobile Text Content */}
      <div className="banner-content text-center space-y-4 mb-8">
                          <h1
          className="text-primary banner-title mb-0"
                      style={{ fontSize }}
                    >
                      Your Career Journey,
                    </h1>
                    <h1
          className="text-primary banner-title mb-0"
                      style={{ fontSize }}
                    >
                      Simplified!
                    </h1>
        <div className="space-y-2">
          <p className="font-sans text-grey">
                      Discover thousands of opportunities tailored,
                    </p>
          <p className="font-sans text-grey">
                      to your skills and aspirations.
                    </p>
        </div>

        <div className="banner-btn mt-6 opacity-0">
                                          <button
            onClick={handleNeedJob}
            className="relative rounded-full bg-primary px-12 py-4 font-mono font-bold text-white transition-colors duration-300 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-blue-500 hover:bg-blue-700 hover:before:bg-blue-700"
                                          >
                                            {bannerData.link.label}
          </button>
        </div>
      </div>

      {/* Mobile Images */}
      <div className="banner-images relative">
        <ImageFallback1
          className="banner-img opacity-0 relative rounded-lg w-[14vh] h-[18vh] right-[0vh] top-[12vh] sm:w-[14vh] sm:h-[18vh] md:right-[0vh] md:top-[17vh] md:w-[16vh] md:h-[20vh]"
          src="/images/home1.png"
          alt=""
        />
        <ImageFallback1
          className="banner-img opacity-0 relative rounded-lg w-[14vh] h-[18vh] right-[15vh] top-[5vh] sm:w-[14vh] sm:h-[18vh] md:right-[17vh] md:top-[8vh] md:w-[16vh] md:h-[20vh]"
          src="/images/home2.jpg"
          alt=""
        />
        <ImageFallback1
          className="banner-img opacity-0 relative rounded-lg w-[14vh] h-[18vh] right-[0vh] top-[-5vh] sm:w-[14vh] sm:h-[18vh] md:right-[0vh] md:top-[-2vh] md:w-[16vh] md:h-[20vh]"
          src="/images/home3.jpg"
          alt=""
        />
        <ImageFallback1
          className="banner-img opacity-0 relative w-[14vh] h-[18vh] rounded-lg right-[15vh] top-[-12vh] sm:w-[14vh] sm:h-[18vh] md:right-[17vh] md:top-[-11vh] md:w-[16vh] md:h-[20vh]"
          src="/images/home5.jpg"
          alt=""
        />
        <ImageFallback1
          className="banner-img opacity-0 relative rounded-lg w-[14vh] h-[18vh] right-[30vh] top-[-38vh] sm:w-[14vh] sm:h-[18vh] md:right-[34vh] md:top-[-41vh] md:w-[16vh] md:h-[20vh]"
          src="/images/home6.jpg"
          alt=""
        />
                  </div>
    </div>
  </div>
</section>
    </>
  );
};

export default HomeBanner;
