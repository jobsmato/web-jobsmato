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
    <section className="section banner pt-0 w-[700px] h-[900px] md:w-[1600px] Md:h-[900px]">
      <div className="container-xl ">
        <div className="relative bg-white">
          <div className="bg-theme banner-bg  col-12 absolute left-0 top-0 blur-background ">


          </div>
          <div className="row  rounded-2xl ">
            <div className="col-12">
              <div className="row relative justify-center pb-10 ">
              
                <div className="banner-images relative pb-10 hover:animate-shake transition-transform duration-300  ">


                  <ImageFallback
                    className="banner-img opacity-0 relative rounded-lg  xl:top-[1%] xl:left-[95%] md:left-[15%] md:top-[1%]  hidden md:block "
                    src="/images/home1.png"
                    width={200}
                    height={300}
                    priority={true}
                    alt=""
                  />

                  <ImageFallback
                    className="banner-img opacity-0 relative rounded-lg xl:top-[-10%]  xl:left-[80%]  md:left-[30%] md:top-[-25%]  left-[30%] top-[10%]"
                    src="/images/home2.jpg"
                    width={200}
                    height={300}
                    priority={true}
                    alt=""
                  />
                  
                  <ImageFallback
                    className="banner-img opacity-0 relative rounded-lg xl:top-[-16%] xl:left-[95%] md:left-[45%] md:top-[-48%]  left-[50%] top-[-50%]"
                    src="/images/home3.jpg"
                    width={200}
                    height={300}
                    priority={true}
                    alt=""
                  />
                  <ImageFallback
                    className="banner-img opacity-0 relative object-fill rounded-lg xl:top-[-28%] xl:left-[80%] left-[70%] top-[-20%] hidden xl:block "
                    src="/images/home5.jpg"
                    width={200}
                    height={300}
                    priority={true}
                    alt=""
                  />
                  <ImageFallback
                    className="banner-img opacity-0  relative rounded-lg xl:top-[-60%] xl:left-[65%] left-[40%] top-[-32%] hidden xl:block"
                    src="/images/home6.jpg"
                    width={200}
                    height={300}
                    priority={true}
                    alt=""
                  />

                </div>
                <div className="banner-content absolute col-12 xl:col-10 pb-10 pt-80 text-Left ">
                  {markdownify(
                    bannerData.title,
                    "h1",
                    "mb-0 banner-title text-primary opacity-0 text-wrap"
                  )}
                  {markdownify(
                    "Simplified!",
                    "h1",
                    "mb-4 banner-title text-primary opacity-0 "
                  )}
                                    {markdownify(
                    bannerData.paragraph1,
                    "h6",
                    "mb-0 banner-title text-grey opacity-0 justify-left"
                  )}
                  {markdownify(
                    bannerData.paragraph,
                    "h6",
                    "mb-4 banner-title text-grey opacity-0 justify-left "
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
                  <div className="row relative  py-5 mt-1">
            <div className="animate from-right col-10 border-y ">
              <Swiper
                loop={true}
                slidesPerView={3}
                breakpoints={{
                  992: {
                    slidesPerView: 4,
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
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
