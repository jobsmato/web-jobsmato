"use client";

import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import ImageFallback1 from "@layouts/components/ImageFallback1";
import useScreenSize from './ScreenSize';



import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

import { useEffect } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeBanner = ({ banner: bannerData, brands }) => {
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
            y: position,
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
    <section className="section banner pt-0 w-[${screenSize}] h-[900px]  ">
              <div
            className="banner-bg absolute left-0 top-[-40] w-full h-full bg-cover bg-center bg-no-repeat blur-background"
            style={{
              backgroundImage: "url('/images/backgr.jpg')", // Replace with your image path
            }}
          ></div>
              
      <div className="container-xl ">
        <div className="relative ">

          <div className="row  rounded-2xl ">
            <div className="col-12">
              <div className="row relative justify-center pb-10 ">
              
                <div className="banner-images relative pb-10 hover:animate-shake transition-transform duration-300  ">

                  <ImageFallback1
                    className="banner-img opacity-0 relative  rounded-lg w-[130px] h-[172px] left-[70%] top-[15%] sm:w-[130px] sm:h-[172px] sm:top-[12%] sm:left-[80%] md:left-[83%] md:top-[12%] md:w-[150px] md:h-[198px] lg:left-[88%] lg:top-[12%] xl:top-[12%] xl:left-[88%] xl:w-[170px] xl:h-[224px]   "
                    src="/images/home1.png"

                    alt=""
                  />

                  <ImageFallback1
                    className="banner-img opacity-0 relative   rounded-lg w-[130px] h-[172px] left-[40%] top-[5%]  sm:w-[130px] sm:h-[172px] sm:top-[4%] sm:left-[61%] md:left-[66%] md:top-[1%] md:w-[150px] md:h-[198px] lg:left-[75%] lg:top-[1%] xl:top-[1%] xl:left-[75%] xl:w-[170px] xl:h-[224px]    "
                    src="/images/home2.jpg"

                    alt=""
                  />
                  
                  <ImageFallback1
                    className="banner-img opacity-0 relative   rounded-lg w-[130px] h-[172px] left-[70%] top-[-4%]  sm:w-[130px] sm:h-[172px] sm:top-[-7%] sm:left-[80%] md:left-[83%] md:top-[-7%] md:w-[150px] md:h-[198px] lg:left-[88%] lg:top-[-7%] xl:top-[-7%] xl:left-[88%] xl:w-[170px] xl:h-[224px] "
                    src="/images/home3.jpg"

                    alt=""
                  />
                  <ImageFallback1
                    className="banner-img opacity-0 relative  w-[130px] h-[172px] rounded-lg left-[40%] top-[-14%] sm:w-[130px] sm:h-[172px] sm:top-[-15%] sm:left-[61%] md:left-[66%] md:top-[-18%] md:w-[150px] md:h-[198px] lg:left-[75%] lg:top-[-18%] xl:top-[-18%] xl:left-[75%] xl:w-[170px] xl:h-[224px]   "
                    src="/images/home5.jpg"

                    alt=""
                  />
                  {/**/}
                  <ImageFallback1
                    className="banner-img opacity-0  relative  rounded-lg w-[130px] h-[172px]  left-[10%] top-[-40%] sm:w-[130px] sm:h-[172px] sm:top-[-45%] sm:left-[42%] md:left-[49%] md:top-[-50%] md:w-[150px] md:h-[198px] lg:left-[62%] lg:top-[-50%] xl:top-[-50%] xl:left-[62%] xl:w-[170px] xl:h-[224px]  "
                    src="/images/home6.jpg"

                    alt=""
                  />

                </div>


                <div className="banner-content absolute col-12 lg:col-10 xl:col-10 pb-10 pt-[36rem] md:pt-[12rem]  xl:pt-[12rem]  text-Left hidden lg:block ">

                <video src="/videos/find.mp4" width="450" height="200" controls={false} muted  autoPlay loop>
                </video>

                </div>
                <div className="banner-content absolute col-12 md:col-13 lg:col-11 xl:col-11 pb-10 pt-[38rem] lg:pt-[38rem] xl:pt-[38rem]  text-Left ">

                  
                  {markdownify(
                    bannerData.title,
                    "h1",
                    "mb-0 ml-4  sm:ml-10 xl:ml-0 banner-title text-primary opacity-0 text-wrap"
                  )}
                  {markdownify(
                    "Simplified!",
                    "h1",
                    "mb-4 ml-4 sm:ml-10 xl:ml-0 banner-title text-primary opacity-0 "
                  )}
                                    {markdownify(
                    bannerData.paragraph,
                    "h6",
                    "mb-0 ml-4 sm:ml-10 xl:ml-0 banner-title  font-sans  text-grey opacity-0 justify-left"
                  )}
                  {markdownify(
                    bannerData.paragraph1,
                    "h6",
                    "mb-4 ml-4 sm:ml-10 xl:ml-0  banner-title font-sans  text-grey opacity-0 justify-left"
                  )}
                  <div className="banner-btn ml-4 sm:ml-10 xl:ml-0 space-x-7 opacity-0">

                    <button
  class="relative rounded-full bg-primary  px-12 py-4 font-mono font-bold text-white transition-colors duration-300 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-blue-500 hover:bg-blue-700 hover:before:bg-blue-700"
>
                    <Link
                      href={bannerData.link.href}
                    >
                      {bannerData.link.label}
                    </Link></button>
     
                  </div>

                </div>


              </div>
              
            </div>
            
          </div>
          

        </div>
        
      </div>

    </section>
  );
};

export default HomeBanner;
