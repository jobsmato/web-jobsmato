"use client"
import React, { useState, useEffect, useCallback } from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Hamender Sharma",
    designation: "Field Sales Execuitve, ApniBus",
    photo: "/images/t1.jpeg",
    text: "I found a field sales role that not only challenges me but also allows me to showcase my skills. The process with Jobsmato was fast, simple, and effective. I would recommend JobsMato to anyone looking for jobs.",
    rating: 5,
    companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
  },
  {
    id: 2,
    name: "Divyanshi gupta",
    designation: "BDE, Wheelseye Technology",
    photo: "/images/t2.jpeg",
    text: "Starting my journey as a Business Development Executive was daunting, but Jobsmato made it so easy! They connected me with the right opportunities, and the process was smooth and efficient. Thanks to them, I landed my first BDE role where I’m learning and growing every day.",
    rating: 5,
    companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
  },
  {
    id: 3,
    name: "Khatri Yash",
    designation: "ASM, Wheelseye Logistics",
    photo: "/images/t3.jpeg",
    text: "Jobmato team helped me identify leadership opportunities that aligned perfectly with my experience and aspirations. There personalised suggestions made the process smooth and efficient. Thanks to JobsMato, I secured an Area Sales Manager role where I can lead with impact and drive results.",
    rating: 4,
    companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
  },
  {
    id: 4,
    name: "Ritik Raj",
    designation: "Customer Support, India Assist",
    photo: "/images/t4.jpeg",
    text: "As an experienced customer support professional, I was looking for a role that allowed me to grow and make an impact. Jobsmato connected me with a company that values my expertise and provides opportunities for professional development. The process was quick and hassle-free!",
    rating: 5,
    companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
  },
  {
    id: 5,
    name: "Laxmi",
    designation: "Tele Sales Executive, One Point One Solutions",
    photo: "/images/t5.jpeg",
    text: "I was struggling to find the right telesales job until I came across Jobsmato. Their personalized recommendations and seamless process made all the difference. I now work in a role that challenges me and allows me to grow in my career.",
    rating: 5,
    companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
  },
  {
    id: 6,
    name: "Piyush Sharma",
    designation: "Software Developer, ApniBus",
    photo: "/images/t6.jpeg",
    text: "I’ve had a fantastic learning experience with JosMato. The platform provides top-notch resources and support that have really helped me improve my skills.",
    rating: 5,
    companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
  }
];

const TestimonialCard = React.memo(({ testimonial }) => {
    return (
      <div className="relative flex flex-col items-center p-4 space-y-2 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        {/* Container for the image */}
        <div className="absolute -top-28 w-56 h-64 overflow-hidden rounded-lg border-4 border-white shadow-lg">
          <img
            src={testimonial.photo}
            alt={`${testimonial.name}'s portrait`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1511367461989-f85a21fda167";
            }}
          />
        </div>
  
        {/* Spacer to push content down due to the absolute image */}
        <div className="h-36" />
  
        {/* Testimonial Content */}
        <h3 className="text-base font-semibold text-indigo-600">{testimonial.name}</h3>
        <p className="text-xs text-gray-600 font-medium">{testimonial.designation}</p>
        <p className="text-xs text-gray-700 italic text-center px-2">
          "{testimonial.text}"
        </p>
      </div>
    );
  });
  
  

const InfiniteTestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);


  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  useEffect(() => {
    let intervalId;
    if (isAutoPlay) {
      intervalId = setInterval(handleNext, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlay, handleNext]);

  const visibleTestimonials = [
    testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length],
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
  ];

  let testimonialsToShow = visibleTestimonials;
  if (windowWidth < 770) {
    testimonialsToShow = [visibleTestimonials[1]]; // Only show the current testimonial
  } else if (windowWidth < 992) {
    testimonialsToShow = visibleTestimonials.slice(0, 2); // Show the first two testimonials
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-16">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {testimonialsToShow.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      <button
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
          )
        }
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Previous testimonial"
      >
        ←
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Next testimonial"
      >
        →
      </button>
    </div>
  );
};

export default InfiniteTestimonialSlider;