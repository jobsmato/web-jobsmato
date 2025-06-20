"use client";

import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import ImageFallback1 from "@layouts/components/ImageFallback1";
import useScreenSize from './ScreenSize';



import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

import { useEffect, useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeBanner = ({ banner: bannerData, brands }) => {

  const [fontSize, setFontSize] = useState("2rem"); // Default font size

  useEffect(() => {
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
    //w-[700px] h-[900px] md:w-[1600px] Md:h-[900px]
<section className="section banner pt-0 w-full h-screen overflow-hidden relative">
  <div
    className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/images/backgr.jpg')",
    }}
  ></div>
  <div className="container flex flex-col items-end justify-center h-screen">
    <div className="banner-images relative">

              <ImageFallback1
                    className="banner-img opacity-0 relative rounded-lg w-[14vh] h-[18vh] right-[0vh] top-[12vh] sm:w-[14vh] sm:h-[18vh]  md:right-[0vh] md:top-[17vh] md:w-[16vh] md:h-[20vh]  lg:top-[23vh]  xl:right-[0vh] xl:top-[30vh]  xl:w-[18vh] xl:h-[24vh]"
                    src="/images/home1.png"

                    alt=""
                  />

                  <ImageFallback1
                    className="banner-img opacity-0 relative   rounded-lg w-[14vh] h-[18vh] right-[15vh] top-[5vh]  sm:w-[14vh] sm:h-[18vh]   md:right-[17vh] md:top-[8vh] md:w-[16vh] md:h-[20vh] lg:top-[13vh] xl:right-[19vh] xl:top-[15vh] xl:w-[18vh] xl:h-[24vh]"
                    src="/images/home2.jpg"

                    alt=""
                  />
                  
                  <ImageFallback1
                    className="banner-img opacity-0 relative   rounded-lg w-[14vh] h-[18vh] right-[0vh] top-[-5vh]  sm:w-[14vh] sm:h-[18vh]   md:right-[0vh] md:top-[-2vh] md:w-[16vh] md:h-[20vh] lg:top-[4vh]  xl:right-[0vh] xl:top-[7vh]  xl:w-[18vh] xl:h-[24vh]"
                    src="/images/home3.jpg"

                    alt=""
                  />
                  <ImageFallback1
                    className="banner-img opacity-0 relative w-[14vh] h-[18vh] rounded-lg right-[15vh] top-[-12vh] sm:w-[14vh] sm:h-[18vh]  md:right-[17vh] md:top-[-11vh] md:w-[16vh] md:h-[20vh] lg:top-[-6vh] xl:right-[19vh] xl:top-[-8vh] xl:w-[18vh] xl:h-[24vh]"
                    src="/images/home5.jpg"

                    alt=""
                  />
                  {/**/}
                  <ImageFallback1
                    className="banner-img opacity-0  relative  rounded-lg w-[14vh] h-[18vh]  right-[30vh] top-[-38vh] sm:w-[14vh] sm:h-[18vh]   md:right-[34vh] md:top-[-41vh] md:w-[16vh] md:h-[20vh] lg:top-[-34vh]  xl:right-[38vh] xl:top-[-40vh] xl:w-[18vh] xl:h-[24vh]"
                    src="/images/home6.jpg"

                    alt=""
                  />
      {/* Add other images */}
    </div>
    {/* <div className="banner-content relative left-[-60vh] top-[-58vh] xl:top-[-70vh]  xl:left-[-85vh] 2xl:left-[-95vh] text-Left hidden lg:block   ">

<lottie-player
autoplay
controls={false}
loop
mode="normal"
src="/videos/ResumeEvaluation.json"
style={{width: "320px",zIndex :'3'}}
></lottie-player>
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>


</div> */}




                <div className="banner-content absolute left-[3vh] pb-[18vh] md:pb-[45vh] pt-[75vh] sm:pt-[74vh] md:pt-[90vh] lg:pt-[60vh] xl:pt-[60vh] xl:pl-[10vh]  xl:pl-[5vh] 2xl:pl-[20vh] text-Left ">
                <div className="hidden lg:block  ">
                <lottie-player
autoplay
controls={false}
loop
mode="normal"
src="/videos/ResumeEvaluation.json"
style={{width: "320px",zIndex :'3'}}
></lottie-player>
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</div>    
                          <h1
                      className="mb-0 ml-4 text-primary banner-title"
                      style={{ fontSize }}
                    >
                      Your Career Journey,
                    </h1>
                    <h1
                      className="mb-0 ml-4 text-primary banner-title"
                      style={{ fontSize }}
                    >
                      Simplified!
                    </h1>
                    <p
                      className="mb-0 ml-4  font-sans text-grey justify-left"
                    >
                      Discover thousands of opportunities tailored,
                    </p>
                    <p
                      className="mb-4 ml-4  font-sans text-grey justify-left"
                    >
                      to your skills and aspirations.
                    </p>

                  <div className="banner-btn mt-2 ml-3  xl:ml-5 space-x-7 opacity-0">

                                          <button
                        className="relative rounded-full bg-primary  px-12 py-4 font-mono font-bold text-white transition-colors duration-300 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-blue-500 hover:bg-blue-700 hover:before:bg-blue-700"
                      >
                                          <Link
                                            href={bannerData.link.href}
                                          >
                                            {bannerData.link.label}
                                          </Link></button>
     
                  </div>
    </div>
  </div>
</section>


    // <section className="section banner pt-0 w-[${screenSize.width}] h-screen  ">
    //           <div
    //         className="banner-bg absolute left-0 top-[-40] w-full h-full bg-cover bg-center bg-no-repeat blur-background"
    //         style={{
    //           backgroundImage: "url('/images/backgr.jpg')", // Replace with your image path
    //         }}
    //       ></div>
              
    //   <div className="container-xl flex flex-col items-center justify-center h-full">

              
    //             <div className="banner-images relative pb-10 hover:animate-shake transition-transform duration-300  ">

    //               <ImageFallback1
    //                 className="banner-img opacity-0 relative  rounded-lg w-[130px] h-[172px] left-[70%] top-[15%] sm:w-[130px] sm:h-[172px] sm:top-[12%] sm:left-[80%] md:left-[83%] md:top-[12%] md:w-[150px] md:h-[198px] lg:left-[88%] lg:top-[12%] xl:top-[12%] xl:left-[88%] xl:w-[170px] xl:h-[224px]   "
    //                 src="/images/home1.png"

    //                 alt=""
    //               />

    //               <ImageFallback1
    //                 className="banner-img opacity-0 relative   rounded-lg w-[130px] h-[172px] left-[40%] top-[5%]  sm:w-[130px] sm:h-[172px] sm:top-[4%] sm:left-[61%] md:left-[66%] md:top-[1%] md:w-[150px] md:h-[198px] lg:left-[75%] lg:top-[1%] xl:top-[1%] xl:left-[75%] xl:w-[170px] xl:h-[224px]    "
    //                 src="/images/home2.jpg"

    //                 alt=""
    //               />
                  
    //               <ImageFallback1
    //                 className="banner-img opacity-0 relative   rounded-lg w-[130px] h-[172px] left-[70%] top-[-4%]  sm:w-[130px] sm:h-[172px] sm:top-[-7%] sm:left-[80%] md:left-[83%] md:top-[-7%] md:w-[150px] md:h-[198px] lg:left-[88%] lg:top-[-7%] xl:top-[-7%] xl:left-[88%] xl:w-[170px] xl:h-[224px] "
    //                 src="/images/home3.jpg"

    //                 alt=""
    //               />
    //               <ImageFallback1
    //                 className="banner-img opacity-0 relative  w-[130px] h-[172px] rounded-lg left-[40%] top-[-14%] sm:w-[130px] sm:h-[172px] sm:top-[-15%] sm:left-[61%] md:left-[66%] md:top-[-18%] md:w-[150px] md:h-[198px] lg:left-[75%] lg:top-[-18%] xl:top-[-18%] xl:left-[75%] xl:w-[170px] xl:h-[224px]   "
    //                 src="/images/home5.jpg"

    //                 alt=""
    //               />
    //               {/**/}
    //               <ImageFallback1
    //                 className="banner-img opacity-0  relative  rounded-lg w-[130px] h-[172px]  left-[10%] top-[-40%] sm:w-[130px] sm:h-[172px] sm:top-[-45%] sm:left-[42%] md:left-[49%] md:top-[-50%] md:w-[150px] md:h-[198px] lg:left-[62%] lg:top-[-50%] xl:top-[-50%] xl:left-[62%] xl:w-[170px] xl:h-[224px]  "
    //                 src="/images/home6.jpg"

    //                 alt=""
    //               />

    //             </div>


    //             <div className="banner-content absolute col-12 lg:col-11 xl:col-13 pb-10 pt-[36rem] md:pt-[12rem] lg:pt-[4rem] xl:pt-[4rem]  text-Left hidden lg:block ">
    //                   {/* 
    //                                   <video src="/videos/find.mp4" width="350" height="100" controls={false} muted  autoPlay loop>
    //                                   </video> */}
    //                                   <lottie-player
    //                       autoplay
    //                       controls={false}
    //                       loop
    //                       mode="normal"
    //                       src="/videos/ResumeEvaluation.json"
    //                       style={{width: "320px",zIndex :'3'}}
    //                   ></lottie-player>
    //                   <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>


    //             </div>
    //             <div className="banner-content absolute col-12 md:col-11 lg:col-11 xl:col-13 pb-10 pt-[38rem] sm:pt-[36rem] md:pt-[31rem] lg:pt-[26rem] xl:pt-[26rem]  text-Left ">

                  
    //               {markdownify(
    //                 bannerData.title,
    //                 "h1",
    //                 "mb-0 ml-4  sm:ml-10 xl:ml-5 banner-title text-primary opacity-0 text-wrap"
    //               )}
    //               {markdownify(
    //                 "Simplified!",
    //                 "h1",
    //                 "mb-4 ml-4 sm:ml-10 xl:ml-5 banner-title text-primary opacity-0 "
    //               )}
    //                                 {markdownify(
    //                 bannerData.paragraph,
    //                 "h6",
    //                 "mb-0 ml-4 sm:ml-10 xl:ml-5 banner-title  font-sans  text-grey opacity-0 justify-left"
    //               )}
    //               {markdownify(
    //                 bannerData.paragraph1,
    //                 "h6",
    //                 "mb-4 ml-4 sm:ml-10 xl:ml-5  banner-title font-sans  text-grey opacity-0 justify-left"
    //               )}
    //               <div className="banner-btn ml-4 sm:ml-10 xl:ml-5 space-x-7 opacity-0">

    //                                       <button
    //                     class="relative rounded-full bg-primary  px-12 py-4 font-mono font-bold text-white transition-colors duration-300 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-blue-500 hover:bg-blue-700 hover:before:bg-blue-700"
    //                   >
    //                                       <Link
    //                                         href={bannerData.link.href}
    //                                       >
    //                                         {bannerData.link.label}
    //                                       </Link></button>
     
    //               </div>

    //             </div>

          

        
    //   </div>

    // </section>
  );
};

export default HomeBanner;
