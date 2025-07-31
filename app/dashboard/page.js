"use client";
import { cn } from "../../lib/utils/cn";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleAuthMe = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/login-user');
          return;
        }

        // Call auth/me API
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
          
          // Store user_id if not already in localStorage
          if (userData.id && !localStorage.getItem('user_id')) {
            localStorage.setItem('user_id', userData.id);
          }
          
          // Update URL with user_id if not present
          const currentUserId = searchParams.get('user_id');
          if (!currentUserId && userData.id) {
            const newUrl = `/dashboard?user_id=${userData.id}`;
            router.replace(newUrl);
          }
          
          setIsLoading(false);
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load user profile');
        setIsLoading(false);
      }
    };

    handleAuthMe();
  }, [router, searchParams]);

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-gray-50 flex items-center justify-center py-8 pt-36 md:pt-20 overflow-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen bg-gray-50 flex items-center justify-center py-8 pt-36 md:pt-20 overflow-hidden">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/login-user')}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center py-8 pt-36 md:pt-20 overflow-hidden">
      {/* Hero Background */}
      <div
        className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/backgr.jpg')" }}
        aria-hidden="true"
      ></div>
      <div className="relative z-20 max-w-6xl mx-auto px-4 w-full">
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
          <Link href="/onboarding/candidate" className="h-full">
            <BentoGridItem
              title={items[0].title}
              description={items[0].description}
              header={items[0].header}
              className={cn("[&>p:text-lg] md:col-span-1 h-full", items[0].className)}
              icon={items[0].icon}
            />
          </Link>
          {items.slice(1).map((item, i) => (
            <BentoGridItem
              key={i+1}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg] opacity-50 pointer-events-none", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 p-2  items-center space-x-2 bg-white"
      >
        <div className="h-6 w-6 rounded-full bg-primary shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 p-2 items-center space-x-2 w-3/4 ml-auto bg-white"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full" />
        <div className="h-6 w-6 rounded-full bg-primary shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 p-2 items-center space-x-2 bg-white"
      >
        <div className="h-6 w-6 rounded-full bg-primary shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full" />
      </motion.div>
    </motion.div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 p-2  items-center space-x-2 bg-neutral-100 w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #3356f2, #3b82f6, #60a5fa, #93c5fd)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 border border-neutral-200 flex flex-col items-center justify-center"
      >
        <img
          src="/images/google-icon-logo-svgrepo-com.svg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Sales Manager
        </p>
        <p className="border border-primary bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 mt-4">
          Sales
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 border border-neutral-200 flex flex-col items-center justify-center">
        <img
          src="/images/mcdonald-s-15-logo-svgrepo-com.svg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Product Manager
        </p>
        <p className="border border-primary bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 mt-4">
          Management
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 border border-neutral-200 flex flex-col items-center justify-center"
      >
        <img
          src="/images/apple-black-logo-svgrepo-com.svg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Data Scientist
        </p>
        <p className="border border-primary bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 mt-4">
          Technical
        </p>
      </motion.div>
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 p-2  items-start space-x-2 bg-white"
      >
        <img
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-500">
          Can you Help me find jobs for my role , i like to travel? ....
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white"
      >
        <p className="text-xs text-neutral-500">Yes.</p>
        <div className="h-6 w-6 rounded-full bg-primary shrink-0" />
      </motion.div>
    </motion.div>
  );
};
const items = [
  {
    title: "Complete Profile",
    description: (
      <span className="text-sm">
       Complete your profile and fill in your details.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Build Resume",
    description: (
      <span className="text-sm">
        Let AI handle help building your resume.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Get Trained",
    description: (
      <span className="text-sm">
        Get trained for the job you want to apply for.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Apply Job",
    description: (
      <span className="text-sm">
        Apply to the job you want to apply for.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Get Counselling",
    description: (
      <span className="text-sm">
         Get counselling to find the right job for you.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
]; 