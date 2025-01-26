"use client";

import Circle from "@layouts/components/Circle";
import VideoPopup from "@layouts/components/VideoPopup";
import { markdownify } from "@lib/utils/textConverter";
import React, { useState } from "react";


const ShortIntro = ({ intro }) => {
  const [activeCard, setActiveCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    {
      id: 1,
      title: "Identify Potential Candidates",
      description: "Identify Potential Candidates",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      id: 2,
      title: "Providing Necessary Training",
      description: "Candidates get targeted training to ensure that they possesd requried skills",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    },
    {
      id: 3,
      title: "Ensuing Candidates match job criteria",
      description: "We rigrously assess candidates to match specific need of employers",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    },
    {
      id: 4,
      title: "Using Advance Algorithms for candidate matching",
      description: "Our Technology utilizes Algorithms to align candidates with sutiable job openings",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
    },
    {
      id: 5,
      title: "Ensuring seamless and efficient hiring process",
      description: "We streamine the process to facilate quicker and more effective recuritment",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
    }
  ]

  const handleCardClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setActiveCard(cards[currentIndex].id);
  };
 
  return(
   

    
    <section className="section pt-0">
      <div className="container-xl">
        <div className="relative px-4 py-[70px]">
          <div className="text-center">
            <div className="animate">
              <p>{intro.subtitle}</p>
              {markdownify(intro.title, "h2", "mt-4 section-title")}
              {markdownify(intro.description, "p", "mt-10")}
            </div>
          <div class="p-4 mb-4 text-lg text-center leading-tight first-letter:capitalize font-medium dark:text-gray-100">
        </div>
        <div className="min-h-80 bg-none p-1 flex items-top justify-center ">
          <div className="relative w-full max-w-4xl mb-15 ">
            {cards.map((card, index) => (
              <div
                key={card.id}
                onClick={handleCardClick}
                onKeyPress={(e) => e.key === "Enter" && handleCardClick()}
                tabIndex={0}
                className={`
                  absolute w-full bg-white rounded-2xl shadow-lg transition-all duration-500 ease-in-out
                  transform cursor-pointer flex overflow-hidden
                  ${activeCard === card.id ? "scale-105 z-50" : `scale-100 z-${30 - index}`}
                  ${activeCard && activeCard !== card.id ? "opacity-50" : "opacity-100"}
                  ${getCardPosition(index, cards.length, activeCard === card.id)}
                  hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                `}
                style={{
                  transform: `
                    translateY(${activeCard === card.id ? "0" : `${index * 20}px`})
                    ${activeCard === card.id ? "scale(1.05)" : "scale(1)"}
                  `,
                  transition: "transform 0.5s ease-in-out"
                }}
              >
                <div className="relative w-1/2">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
                <div className="p-6 w-1/2 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
    </div>
  <div class="mx-auto w-fit grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-6">
  </div>
  <div class="block mt-8">
  </div>
          </div>
          <div className="bg-theme absolute left-0 top-0 w-full">
            <Circle
              className="left-[10%] top-12"
              width={32}
              height={32}
              fill={false}
            />
            <Circle className="left-[3%] top-[30%]" width={85} height={85} />
            <Circle
              className="bottom-[52%] left-[22%]"
              width={20}
              height={20}
            />
            <Circle
              className="bottom-[35%] left-[15%]"
              width={47}
              height={47}
              fill={false}
            />
            <Circle 
              className="bottom-[6%] left-[6%]"
              width={62}
              height={62}
              fill={false}
            />
            <Circle className="right-[12%] top-[12%]" width={20} height={20} />
            <Circle
              className="right-[2%] top-[30%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="right-[19%] top-[50%]"
              width={37}
              height={37}
              fill={false}
            />
            <Circle className="right-[33%] top-[52%]" width={20} height={20} />
            <Circle
              className="bottom-[18%] right-[5%]"
              width={65}
              height={65}
            />
          </div>
        </div>
      </div>
    </section>
    
    
  );
};


const getCardPosition = (index, totalCards, isActive) => {
  if (isActive) return "";
  const baseTransform = index * 2;
  return `transform translate-y-[${baseTransform}rem]`;
};

export default ShortIntro;
