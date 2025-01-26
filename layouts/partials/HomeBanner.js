"use client";

import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
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
    <section className="section banner pt-0 w-screen h-85">
      <div className="container-xl ">
        <div className="relative bg-white">
          <div className="bg-theme banner-bg  col-12 absolute left-0 top-0 blur-background">
            {/* <Circle
              className="circle left-[10%] top-12 filter blur-sm "
              width={32}
              height={32}
              fill={false}

            />
            <Circle
              className="circle left-[2.5%] top-[60%] filter blur-sm"
              width={85}
              height={85}
              fill={false}
            />
            <Circle
              className="circle bottom-[48%] left-[22%] filter blur-sm"
              width={20}
              height={20}
            fill={false}
            />
            <Circle
              className="circle bottom-[37%] left-[15%] filter blur-sm"
              width={47}
              height={47}
              fill={false}

            />
            <Circle
              className="circle bottom-[53%] left-[6%] filter blur-sm"
              width={62}
              height={62}
              fill={false}

            />
            <Circle
              className="circle right-[6%] top-[15%] filter blur-sm"
              width={20}
              height={20}
              fill={false}

            />

            <Circle
              className="circle right-[2%] top-[30%] filter blur-sm"
              width={73}
              height={73}
              fill={false}
            /> 

            <Circle
              className="circle right-[19%] top-[48%] filter blur-sm"
              width={37}
              height={37}
              fill={false}
            /> 
            <Circle
              className="circle right-[33%] top-[54%] filter blur-sm"
              width={20}
              height={20}
              fill={false}

            />
            <Circle
              className="circle bottom-[20%] right-[3%] filter blur-sm"
              width={65}
              height={65}
              fill={false}
            /> */}

          </div>
          <div className="row  rounded-2xl">
            <div className="col-12">
              <div className="row relative justify-center pb-10">
              
                <div className="banner-images relative pb-10">

                  <ImageFallback
                    className="banner-img opacity-0 relative rounded-lg  xl:top-[1%] xl:left-[95%] sm:left-[10%] sm:top-[1%]"
                    src="/images/home1.png"
                    width={200}
                    height={300}
                    priority={true}
                    alt=""
                  />
                  <ImageFallback
                    className="banner-img opacity-0 relative rounded-lg xl:top-[-10%]  xl:left-[80%]  sm:left-[40%] sm:top-[-16%] "
                    src="/images/home2.jpg"
                    width={200}
                    height={300}
                    priority={true}
                    alt=""
                  />
                  
                  <ImageFallback
                    className="banner-img opacity-0 relative rounded-lg xl:top-[-16%] xl:left-[95%] sm:left-[70%] sm:top-[-32%]"
                    src="/images/home3.jpg"
                    width={200}
                    height={300}
                    priority={true}
                    alt=""
                  />
                  <ImageFallback
                    className="banner-img opacity-0 relative object-fill rounded-lg xl:top-[-28%] xl:left-[80%] sm:left-[70%] sm:top-[-20%]"
                    src="/images/home5.jpg"
                    width={200}
                    height={300}
                    priority={true}
                    alt=""
                  />
                  <ImageFallback
                    className="banner-img opacity-0  relative rounded-lg xl:top-[-60%] xl:left-[65%] sm:left-[40%] sm:top-[-32%]"
                    src="/images/home6.jpg"
                    width={200}
                    height={300}
                    priority={true}
                    alt=""
                  />

                </div>
                <div className="banner-content absolute col-10 pb-10 pt-80 text-Left">
                  {markdownify(
                    bannerData.title,
                    "h1",
                    "mb-0 banner-title text-primary opacity-0"
                  )}
                  {markdownify(
                    "Simplified!",
                    "h1",
                    "mb-4 banner-title text-primary opacity-0 "
                  )}
                                    {markdownify(
                    bannerData.paragraph1,
                    "h6",
                    "mb-0 banner-title text-grey opacity-0 justify-left whitespace-pre-wrap break-words"
                  )}
                  {markdownify(
                    bannerData.paragraph,
                    "h6",
                    "mb-4 banner-title text-grey opacity-0 justify-left whitespace-pre-wrap break-words"
                  )}
                  <div className="banner-btn space-x-7 opacity-0">
                    <Link
                      className="btn btn-primary"
                      href={bannerData.link.href}
                    >
                      {bannerData.link.label}
                    </Link>
                    {/* <Link
                      className="btn btn-primary"
                      href={bannerData.link2.href}
                    >
                      {bannerData.link2.label}
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row relative border-y border-border py-1">
            <div className="animate from-right col-12">
              <Swiper
                loop={true}
                slidesPerView={3}
                breakpoints={{
                  992: {
                    slidesPerView: 5,
                  },
                }}
                spaceBetween={20}
                modules={[Autoplay]}
                autoplay={{ delay: 3000 }}
              >
                {brands.map((brand, index) => (
                  <SwiperSlide
                    className=" h-20 cursor-pointer px-6 py-6 grayscale  transition hover:grayscale-0 lg:px-10"
                    key={"brand-" + index}
                  >
                    <div className="relative h-full">
                      <ImageFallback
                        className="object-contain"
                        src={brand}
                        sizes="100vw"
                        alt=""
                        fill={true}
                        priority={true}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
