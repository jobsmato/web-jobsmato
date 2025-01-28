"use client";

import Circle from "@layouts/components/Circle";
import VideoPopup from "@layouts/components/VideoPopup";
import { markdownify } from "@lib/utils/textConverter";
import React, { useState } from "react";

import Card from "./Cards";


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
          <div className="p-4 mb-4 text-lg text-center leading-tight first-letter:capitalize font-medium dark:text-gray-100">
        </div>

    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-blue-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        </div>
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]  p-4 rounded ">

                        <div
                  className="w-100 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden"
                >
                  <div className="w-24 h-24 bg-blue-500 rounded-full absolute -right-5 -top-7">
                    <p className="absolute bottom-6 left-7 text-white text-2xl">01</p>
                  </div>
                  <div className="fill-blue-500 w-12">
             <svg width="80px" height="80px" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enableBackground="new 0 0 76.00 76.00" xmlSpace="preserve" fill="#3356f2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.45599999999999996"></g><g id="SVGRepo_iconCarrier"> <path fill="#3356f2" fillOpacity="0.403922" strokeWidth="0.2" strokeLinejoin="round" d="M 57,19L 57,26L 50,26L 50,19L 57,19 Z M 48,19L 48,26L 41,26L 41,19L 48,19 Z M 39,19L 39,26L 32,26L 32,19L 39,19 Z M 57,28L 57,35L 50,35L 50,28L 57,28 Z M 48,28L 48,35L 41,35L 41,28L 48,28 Z M 39,28L 39,35L 32,35L 32,28L 39,28 Z M 57,37L 57,44L 50,44L 50,37L 57,37 Z M 48,37L 48,44L 41,44L 41,37L 48,37 Z M 39,37L 39,44L 32,44L 32,37L 39,37 Z "></path> <path fill="#3356f2" fillOpacity="1" strokeWidth="0.2" strokeLinejoin="round" d="M 23.6506,56.2021C 22.5867,57.266 20.8618,57.266 19.7979,56.2021C 18.734,55.1382 18.734,53.4133 19.7979,52.3494L 27.6722,44.4751C 26.6112,42.7338 26,40.6883 26,38.5C 26,32.1487 31.1487,27 37.5,27C 43.8513,27 49,32.1487 49,38.5C 49,44.8513 43.8513,50 37.5,50C 35.3117,50 33.2662,49.3888 31.5249,48.3278L 23.6506,56.2021 Z M 37.5,31C 33.3579,31 30,34.3579 30,38.5C 30,42.6421 33.3579,46 37.5,46C 41.6421,46 45,42.6421 45,38.5C 45,34.3579 41.6421,31 37.5,31 Z "></path> </g></svg>
                  </div>
                  <h1 className="font-bold text-xl">Identify Potential Candidates</h1>
                  <p className="text-sm text-zinc-500 leading-6">
                  We meticulously search for Candidates  to find hidden talent
                  </p>
                </div>

        </div>
    </div>
    
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-blue-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        </div>
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]  p-4 rounded ">

<div
className="w-100 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden"
>
<div className="w-24 h-24 bg-blue-500 rounded-full absolute -right-5 -top-7">
<p className="absolute bottom-6 left-7 text-white text-2xl">02</p>
</div>
<div className="fill-blue-500 w-12">
               <svg fill="#3356f2" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 496 496" xmlSpace="preserve" width="60px" height="60px"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M432,336h-10.84c16.344-13.208,26.84-33.392,26.84-56v-32c0-30.872-25.128-56-56-56h-32c-2.72,0-5.376,0.264-8,0.64V48 h16V0H0v48h16v232H0v48h187.056l40,80H304v88h192v-96C496,364.712,467.288,336,432,336z M422.584,371.328l-32.472,13.92 L412.28,352h5.472L422.584,371.328z M358.944,352h34.112L376,377.576L358.944,352z M361.872,385.248l-32.472-13.92L334.24,352 h5.472L361.872,385.248z M432.008,280C432,310.872,406.872,336,376,336s-56-25.128-56-56h37.424 c14.12,0,27.392-5.504,37.368-15.48l4.128-4.128c8.304,10.272,20.112,16.936,33.088,18.92V280z M48,192v72h107.176 c0.128,0.28,0.176,0.584,0.312,0.856L163.056,280H32V48h304v149.48c-18.888,9.008-32,28.24-32,50.52v32h-65.064l-24.816-46.528 C208.368,222.696,197.208,216,185,216c-10.04,0-18.944,4.608-25,11.712V192H48z M144,208v40H64v-40H144z M360,208h32 c22.056,0,40,17.944,40,40v15.072c-9.168-2.032-17.32-7.48-22.656-15.48l-8.104-12.152l-17.768,17.768 c-6.96,6.96-16.208,10.792-26.048,10.792H320v-16C320,225.944,337.944,208,360,208z M16,16h336v16H16V16z M16,312v-16h155.056 l8,16H16z M256,392h-19.056L169.8,257.712c-1.176-2.36-1.8-4.992-1.8-7.608V249c0-9.376,7.624-17,17-17c6.288,0,12.04,3.456,15,9 l56,104.992V392z M247.464,296h58.392c1.28,5.616,3.232,10.968,5.744,16H256L247.464,296z M264.536,328h57.952 c2.584,2.872,5.352,5.568,8.36,8H268.8L264.536,328z M480,480h-32v-32h32V480z M480,432h-32v-32h-16v80H320v-88h-48v-40h45.76 l-7.168,28.672L376,408.704l65.416-28.032l-7.144-28.56C459.68,353.312,480,374.296,480,400V432z"></path> <path d="M160,128v-16h-16.808c-1.04-5.096-3.072-9.832-5.856-14.024l11.92-11.92l-11.312-11.312l-11.92,11.92 c-4.192-2.784-8.928-4.816-14.024-5.856V64H96v16.808c-5.096,1.04-9.832,3.072-14.024,5.856l-11.92-11.92L58.744,86.056 l11.92,11.92c-2.784,4.192-4.816,8.928-5.856,14.024H48v16h16.808c1.04,5.096,3.072,9.832,5.856,14.024l-11.92,11.92 l11.312,11.312l11.92-11.92c4.192,2.784,8.928,4.816,14.024,5.856V176h16v-16.808c5.096-1.04,9.832-3.072,14.024-5.856 l11.92,11.92l11.312-11.312l-11.92-11.92c2.784-4.192,4.816-8.928,5.856-14.024H160z M104,144c-13.232,0-24-10.768-24-24 s10.768-24,24-24s24,10.768,24,24S117.232,144,104,144z"></path> <polygon points="244.28,80 272,80 272,64 235.72,64 203.72,112 176,112 176,128 212.28,128 "></polygon> <rect x="288" y="64" width="32" height="16"></rect> <path d="M224,144h-48v48h48V144z M208,176h-16v-16h16V176z"></path> <rect x="240" y="160" width="32" height="16"></rect> <rect x="288" y="160" width="32" height="16"></rect> </g> </g> </g> </g></svg>   


</div>
<h1 className="font-bold text-xl">Providing Necessary Training</h1>
<p className="text-sm text-zinc-500 leading-6">
Candidates get targeted training to ensure that they possesd requried skills
</p>
</div>

</div>
    </div>
    
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-blue-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        </div>
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]  p-4 rounded ">

<div
className="w-100 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden"
>
<div className="w-24 h-24 bg-blue-500 rounded-full absolute -right-5 -top-7">
<p className="absolute bottom-6 left-7 text-white text-2xl">03</p>
</div>
<div className="fill-blue-500 w-12">
<svg viewBox="0 0 48 48" id="b" xmlns="http://www.w3.org/2000/svg" fill="#3356f2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><defs></defs><path id="c" className="e" d="m24.9697,39.04v-3.7188c2.9742-2.9742,5.4671-3.9181,9.2651-3.9181h0c3.798,0,6.2909.9439,9.2651,3.9181v3.7188h-18.5303Z"></path><circle className="e" cx="34.2349" cy="22.8928" r="4.9752"></circle><path id="d" className="e" d="m24.9697,39.04H4.5v-6.2886c5.0295-5.0295,9.2451-6.6257,15.6678-6.6257h0c5.7656,0,9.7526,1.2863,14.1465,5.188"></path><circle className="e" cx="20.1678" cy="15.8085" r="6.8485"></circle></g></svg>
</div>
<h1 className="font-bold text-xl">Ensuing Candidates match job criteria</h1>
<p className="text-sm text-zinc-500 leading-6">
We rigrously assess candidates to match specific need of employers
</p>
</div>

</div>
    </div>
    
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-blue-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        </div>
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]  p-4 rounded ">

<div
className="w-100 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden"
>
<div className="w-24 h-24 bg-blue-500 rounded-full absolute -right-5 -top-7">
<p className="absolute bottom-6 left-7 text-white text-2xl">04</p>
</div>
<div className="fill-blue-500 w-12">
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="#3356f2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>artificial intelligence</title><path d="M106,27A23,23,0,1,0,62.45,37.33a18.45,18.45,0,0,0-9-2.33c-11,0-20,9.85-20,22a23.09,23.09,0,0,0,5.81,15.5A19.12,19.12,0,0,0,35,72c-12.7,0-23,12.54-23,28s10.3,28,23,28a19.12,19.12,0,0,0,4.31-.5A23.09,23.09,0,0,0,33.5,143c0,12.15,9,22,20,22a18.45,18.45,0,0,0,9-2.33A23,23,0,1,0,106,173c0-.34,0-0.67,0-1h0V28h0C106,27.67,106,27.34,106,27Z" fill="none" stroke="#3356f2" strokeLinejoin="bevel" strokeWidth="8"></path><path d="M67.26,189.26a23,23,0,0,0,32.53-32.53H86.9" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></path><path d="M66.26,10.74A23,23,0,0,1,98.79,43.26H87.67" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></path><polyline points="106 95 81 95 49.25 124.76" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></polyline><line x1="44.97" y1="86.65" x2="62.45" y2="111.44" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></line><line x1="62.45" y1="162.67" x2="74.5" y2="146" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></line><polyline points="62.45 37.49 71 51 71 71" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></polyline><line x1="152" y1="100" x2="104" y2="100" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></line><polyline points="107 131 131 131 143 152.67" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></polyline><polyline points="107 70 131 70 143 48.33" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></polyline><circle cx="171" cy="100" r="16" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></circle><circle cx="149" cy="170" r="16" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></circle><circle cx="149" cy="30" r="16" fill="none" stroke="#3356f2" strokeMiterlimit="10" strokeWidth="8"></circle></g></svg></div>
<h1 className="font-bold text-xl">Using Advance Algorithms for candidate matching</h1>
<p className="text-sm text-zinc-500 leading-6">
Our Technology utilizes Algorithms to align candidates with sutiable job openings
</p>
</div>

</div>
    </div>
    
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-blue-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                <path d="M12 10v2H7V8.496a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V12H0V4.496a.5.5 0 0 1 .206-.4l5.5-4a.5.5 0 0 1 .588 0l5.5 4a.5.5 0 0 1 .206.4V10Z" />
            </svg>
        </div>
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]  p-4 rounded ">

              <div
              className="w-100 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden"
              >
              <div className="w-24 h-24 bg-blue-500 rounded-full absolute -right-5 -top-7">
              <p className="absolute bottom-6 left-7 text-white text-2xl">05</p>
              </div>
              <div className="fill-blue-500 w-12">
<svg height="60px" width="60px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#3356f2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path className="st0" d="M386.234,78.954l-49.861,49.861l4.635,4.814c-3.302,2.667-6.644,5.269-9.888,7.579 c-5.236,3.74-10.262,6.74-13.669,8.147c-0.22,0.098-1.146,0.358-2.984,0.35c-2.936,0.032-7.847-0.716-13.864-1.634 c-6.042-0.911-13.27-1.902-21.417-1.911c-7.108-0.024-14.946,0.838-23.199,3.106c-8.236-2.26-16.059-3.106-23.149-3.097 c-8.156,0-15.384,0.992-21.426,1.911c-6.017,0.918-10.92,1.667-13.855,1.634c-1.846,0.016-2.765-0.26-2.952-0.35 c-3.635-1.488-9.116-4.806-14.758-8.912c-2.919-2.122-5.895-4.448-8.847-6.838l4.627-4.798l-49.861-49.861L0,209.216l49.861,49.861 l14.595-15.116l32.216,28.117c0.902,5.391,2.602,10.481,4.562,15.312c1.276,3.074,2.675,6.033,4.107,8.814 c-3.115,5.156-4.814,11.043-4.798,17.011c-0.008,5.92,1.618,11.969,4.96,17.344c5.082,8.172,13.222,13.311,22.011,14.937 c0.05,5.814,1.66,11.742,4.936,17.011c6.221,10.002,16.987,15.547,27.964,15.53c0.423,0,0.854-0.065,1.276-0.081 c0.553,4.651,2.082,9.286,4.7,13.498c6.221,10.001,16.994,15.547,27.955,15.53c1.09,0,2.172-0.114,3.269-0.22 c0.52,4.188,1.911,8.367,4.261,12.14c5.668,9.108,15.474,14.165,25.45,14.141c5.383,0.008,10.896-1.456,15.791-4.497l14.946-9.301 c2.944,1.902,6.033,3.577,9.277,4.943c6.042,2.545,12.571,4.106,19.361,4.114c7.448,0.033,15.311-2.008,22.076-6.765 c4.407-3.073,8.139-7.286,11.196-12.253c0.472,0.016,0.854,0.098,1.342,0.106c3.098,0,6.497-0.464,9.864-1.513 c3.39-1.032,6.757-2.578,10.351-4.634c8.57-4.83,13.709-11.937,16.206-18.027c0.553-1.333,0.951-2.586,1.309-3.797 c2.074-0.658,4.058-1.464,5.854-2.504c6.627-3.814,10.945-9.611,13.604-15.433c2.667-5.88,3.838-11.986,3.854-17.856 c0-0.578-0.073-1.139-0.098-1.708c4.334-1.772,8.228-4.236,11.546-7.139c3.399-2.977,6.253-6.44,8.375-10.392 c2.115-3.935,3.53-8.44,3.538-13.375c0.008-3.212-0.651-6.595-2.09-9.766c-0.464-1.008-1.122-1.935-1.724-2.87 c2.53-4.53,5.106-9.635,7.22-15.148c1.586-4.172,2.92-8.546,3.684-13.141l33.59-29.313l15.742,16.303L512,209.216L386.234,78.954z M138.744,320.428l-0.578,0.366c-1.504,0.928-3.082,1.342-4.708,1.35c-3.017-0.016-5.912-1.488-7.611-4.228 c-0.927-1.504-1.35-3.09-1.35-4.7c0.016-3.033,1.48-5.912,4.212-7.611l19.751-12.27c1.504-0.935,3.082-1.341,4.691-1.358 c3.033,0.032,5.912,1.48,7.62,4.236l10.172-6.318l-10.172,6.326c0.927,1.496,1.341,3.073,1.35,4.684 c-0.017,2.114-0.773,4.131-2.138,5.757L143.02,317.2C141.476,318.159,140.069,319.273,138.744,320.428z M165.113,352.733 c-1.504,0.927-3.082,1.35-4.7,1.35c-3.025-0.016-5.919-1.48-7.619-4.22c-0.928-1.504-1.342-3.098-1.35-4.708 c0.007-2.097,0.764-4.114,2.122-5.724l16.97-10.562c1.537-0.952,2.928-2.057,4.253-3.212l0.618-0.374 c1.504-0.935,3.09-1.35,4.692-1.35c3.041,0.016,5.911,1.48,7.618,4.228c0.927,1.504,1.342,3.073,1.35,4.692 c-0.016,3.016-1.471,5.911-4.236,7.627L165.113,352.733z M218.771,369.419l-19.726,12.262c-1.496,0.928-3.074,1.35-4.7,1.35 c-3.017-0.016-5.912-1.48-7.611-4.22c-0.927-1.512-1.341-3.09-1.35-4.708c0.025-3.033,1.48-5.903,4.212-7.611l19.751-12.27 c1.504-0.935,3.082-1.341,4.691-1.341c3.033,0.007,5.912,1.471,7.62,4.22c0.926,1.505,1.341,3.082,1.35,4.7 C222.991,364.816,221.536,367.694,218.771,369.419z M249.353,389.421c0.625,1,0.894,2.041,0.902,3.13 c-0.016,2.025-0.984,3.952-2.846,5.115l-16.938,10.521c-1.008,0.634-2.049,0.902-3.147,0.902c-2.032-0.008-3.959-0.992-5.106-2.829 c-0.626-1.017-0.895-2.058-0.903-3.146c0.024-2.042,0.992-3.953,2.821-5.091h0.008l16.954-10.538 c1.033-0.642,2.066-0.911,3.147-0.911c2.041,0.016,3.952,0.984,5.098,2.83l10.18-6.31L249.353,389.421z M381.071,315.061 c-0.87,1.683-2.854,3.878-5.366,5.415c-2.513,1.554-5.432,2.464-8.229,2.456c-0.993,0-1.952,0.17-2.887,0.414 c-1.708-0.374-3.416-0.894-5.098-1.561c-5.212-2.033-10.082-5.326-13.522-8.107c-1.724-1.39-3.09-2.642-4.001-3.512l-1.008-1 l-0.22-0.228l-0.033-0.032H340.7c-3.351-3.643-9.026-3.887-12.677-0.537c-3.651,3.351-3.903,9.026-0.544,12.701 c0.3,0.309,4.814,5.236,12.205,10.311c3.708,2.537,8.139,5.123,13.237,7.123c1.179,0.464,2.407,0.894,3.668,1.285 c0.35,0.788,0.797,1.537,1.325,2.244l-0.024,0.017c0.065,0.048,0.553,1.594,0.512,3.578c0.058,3.309-1.146,7.643-2.878,10.033 c-0.845,1.22-1.707,1.992-2.544,2.472c-0.854,0.472-1.716,0.781-3.334,0.805l-0.578-0.008c-0.342-0.016-0.666,0.041-1,0.057 c-0.016,0-0.024,0-0.024,0c-7.79,0.033-15.042-3.309-20.393-6.968c-2.667-1.805-4.806-3.643-6.245-4.992 c-0.708-0.667-1.252-1.22-1.586-1.561l-0.349-0.374l-0.057-0.073h-0.008c-3.244-3.724-8.895-4.131-12.644-0.886 c-3.757,3.252-4.163,8.92-0.911,12.676l-0.008-0.007c0.35,0.39,4.497,5.17,11.71,10.082c4.748,3.211,10.944,6.537,18.303,8.456 c-0.081,0.212-0.13,0.423-0.228,0.635c-0.943,2.13-2.293,4.325-5.968,6.472c-2.481,1.416-4.253,2.155-5.497,2.529 c-1.252,0.374-1.951,0.448-2.846,0.455c-1.162,0.017-2.911-0.244-5.822-0.838c-0.528-0.113-1.056-0.146-1.585-0.178 c-0.196-0.082-0.382-0.155-0.594-0.261c-2.976-1.399-6.603-3.928-9.278-6.082c-1.342-1.065-2.48-2.041-3.261-2.732l-0.878-0.797 l-0.203-0.195l-0.041-0.032c-3.586-3.431-9.278-3.301-12.709,0.284c-3.423,3.586-3.293,9.278,0.293,12.701 c0.187,0.17,3.968,3.798,9.269,7.603c0.943,0.667,1.984,1.342,3.025,2.008c-1.464,2.334-2.992,3.936-4.488,5.001 c-2.391,1.643-4.993,2.423-8.343,2.44c-3,0.008-6.53-0.732-10.058-2.228c-1.171-0.488-2.317-1.179-3.472-1.821 c0.675-2.521,1.049-5.131,1.041-7.75c0.008-5.391-1.472-10.904-4.513-15.791c-5.163-8.302-13.774-13.181-22.792-13.978 c0-0.326,0.056-0.65,0.056-0.984c0.008-5.911-1.618-11.977-4.952-17.344v0.017c-6.228-10.034-17.011-15.58-27.972-15.556 c-0.422,0-0.854,0.073-1.276,0.09c-0.553-4.66-2.082-9.278-4.699-13.49h0.007c-5.082-8.188-13.229-13.326-22.019-14.937 c-0.056-5.814-1.658-11.742-4.936-17.011h0.008c-6.22-10.009-17.011-15.563-27.972-15.547c-5.928,0-11.969,1.627-17.344,4.96 l-11.538,7.172c-0.277-0.634-0.626-1.252-0.878-1.887c-2.008-4.805-3.269-9.546-3.407-12.814l-0.268-5.058l-38.598-33.695 l73.18-75.792c3.741,3.066,7.579,6.107,11.515,8.953c6.521,4.7,12.985,8.847,19.588,11.628c4.237,1.748,8.367,2.179,12.157,2.187 c6.066-0.024,11.627-1.065,17.425-1.911c0.374-0.065,0.764-0.097,1.146-0.155c-7.968,6.838-14.921,14.238-20.8,21.126 c-4.952,5.814-9.131,11.294-12.441,15.766c-3.268,4.448-5.789,8.034-6.895,9.449c-5.448,7.09-7.789,15.571-7.838,24.068 c0.024,7.904,2.122,16.132,7.57,23.085c2.716,3.439,6.326,6.448,10.635,8.497c4.302,2.065,9.229,3.122,14.36,3.122 c6.367-0.017,13.042-1.561,20.109-4.53c22.182-9.383,45.047-15.636,62.252-19.49c8.603-1.919,15.799-3.252,20.816-4.09 c0.944-0.155,1.732-0.285,2.513-0.414l75.271,64.888l0.032,0.016l0.025,0.041C381.73,313.378,381.615,314.053,381.071,315.061z M389.78,260.395l-0.261,5.058c-0.138,2.894-1.122,6.976-2.773,11.205c-0.838,2.211-1.862,4.44-2.935,6.634l-65.92-56.821 c-2.561-2.211-5.976-3.236-9.334-2.813c-0.585,0.114-48.934,6.18-97.047,26.46c-4.789,2.024-8.383,2.65-10.79,2.634 c-1.959,0-3.155-0.35-4.041-0.773c-1.285-0.626-2.204-1.513-3.114-3.212c-0.87-1.674-1.464-4.146-1.455-6.748 c-0.049-3.74,1.285-7.546,2.78-9.35c1.863-2.407,4.139-5.692,7.278-9.937c4.658-6.31,10.985-14.474,18.53-22.418 c7.529-7.944,16.287-15.636,25.467-21.036c12.417-7.293,22.996-9.123,33.022-9.156c6.171-0.008,12.09,0.764,17.864,1.634 c5.789,0.854,11.367,1.878,17.417,1.911c3.781-0.008,7.887-0.439,12.108-2.163l0.056-0.016c6.603-2.781,13.067-6.928,19.588-11.628 c3.912-2.83,7.766-5.887,11.49-8.944l72.035,74.604L389.78,260.395z"></path> </g> </g></svg>
             
              </div>
              <h1 className="font-bold text-xl">Ensuring seamless and efficient hiring process</h1>
              <p className="text-sm text-zinc-500 leading-6">
              We streamine the process to facilate quicker and more effective recuritment
              </p>
              </div>

              </div>
    </div>

</div>
  <div className="mx-auto w-fit grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-6">
  </div>
  <div className="block mt-8">
  </div>
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
