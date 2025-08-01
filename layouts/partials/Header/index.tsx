"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  // Check login status on component mount and listen for changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('access_token');
      setIsLoggedIn(!!token);
    };

    // Check initial status
    checkLoginStatus();

    // Listen for storage changes (when user logs in/out from other components)
    const handleStorageChange = (e) => {
      if (e.key === 'access_token') {
        checkLoginStatus();
      }
    };

    // Listen for custom login/logout events
    const handleLoginEvent = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleLoginEvent);
    window.addEventListener('userLogout', handleLoginEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleLoginEvent);
      window.removeEventListener('userLogout', handleLoginEvent);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Clear all localStorage variables
    localStorage.clear();
    
    // Clear any potential session cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    // Update login status
    setIsLoggedIn(false);
    
    // Dispatch logout event for other components
    window.dispatchEvent(new Event('userLogout'));
    
    // Force a page reload to clear any cached state
    window.location.href = '/';
  };

  // Handle Get Enrolled button click
  const handleGetEnrolled = async () => {
    const token = localStorage.getItem('access_token');
    const userType = localStorage.getItem('user_type');
    
    if (token) {
      // Check if user is a recruiter
      if (userType === 'recruiter') {
        // Recruiter should go to recruiter dashboard
        router.push('/recruiter/dashboard');
        return;
      }
      
      // For regular users, check profile completion
      try {
        // Get current user profile to check completion status
        const response = await fetch('http://localhost:8000/api/v1/auth/me', {
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
            const userId = userData.id || '';
            router.push(`/dashboard?user_id=${userId}`);
            return;
          } else {
            // User hasn't completed onboarding, redirect to onboarding
            console.log('User needs to complete onboarding, redirecting to onboarding');
            const userId = userData.id || '';
            router.push(`/onboarding/candidate?user_id=${userId}`);
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

  // Handle Dashboard navigation based on user type
  const handleDashboardClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const userType = localStorage.getItem('user_type');
    
    if (!token) {
      // User not logged in, redirect to login
      router.push('/login-user');
      return;
    }
    
    if (userType === 'recruiter') {
      // Recruiter goes to recruiter dashboard
      router.push('/recruiter/dashboard');
    } else {
      // Regular user goes to user dashboard
      try {
        // Get current user profile to check completion status
        const response = await fetch('http://localhost:8000/api/v1/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          const userId = userData.id || '';
          
          if (userData.has_candidate_profile && userData.candidate_id) {
            // User has completed onboarding, redirect to dashboard
            router.push(`/dashboard?user_id=${userId}`);
          } else {
            // User hasn't completed onboarding, redirect to onboarding
            router.push(`/onboarding/candidate?user_id=${userId}`);
          }
        } else {
          // If API call fails, default to onboarding
          router.push('/onboarding/candidate');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // If API call fails, default to onboarding
        router.push('/onboarding/candidate');
      }
    }
  };

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full"
                />
                <Image
                  src="/images/logo/dark2-logo.png"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden w-full"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300  lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          menuItem.title === "Dashboard" ? (
                            <button
                              onClick={handleDashboardClick}
                              className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                                usePathName === menuItem.path
                                  ? "text-primary "
                                  : "hover:text-primary"
                              }`}
                            >
                              {menuItem.title}
                            </button>
                          ) : (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              usePathName === menuItem.path
                                ? "text-primary "
                                : "hover:text-primary"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                          )
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary  lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            <div
                              className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100  lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem, index) => (
                                <Link
                                  href={submenuItem.path}
                                  key={index}
                                  className="block rounded py-2.5 text-sm text-dark hover:text-primary lg:px-3"
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  {/* Mobile-only login/logout link */}
                  <div className="block mt-4 md:hidden">
                    <button
                      onClick={isLoggedIn ? handleLogout : handleGetEnrolled}
                      className="block w-full px-5 py-3 text-base font-medium text-white bg-primary rounded hover:bg-opacity-90 transition"
                    >
                      {isLoggedIn ? 'Logout' : 'Get Enrolled'}
                    </button>
                  </div>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                <button
                  onClick={isLoggedIn ? handleLogout : handleGetEnrolled}
                  className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                >
                  {isLoggedIn ? 'Logout' : 'Get Enrolled'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
