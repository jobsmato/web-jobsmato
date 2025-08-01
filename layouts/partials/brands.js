"use client";

import { markdownify } from "@lib/utils/textConverter";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageFallback from "@layouts/components/ImageFallback";
import { useState, useEffect } from "react";

const Brands = ({ brands }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <section className="section ">
        {/* Clients */}
        <div className="section container">
          <div className="animate text-center">
            <p>{brands.subtitle}</p>
            {markdownify(brands.title, "h2", "section-title mt-4")}
          </div>
          <div className="animate from-right col-12 mt-16">
            {isClient ? (
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
                {brands.brands.map((brand, index) => (
                  <SwiperSlide
                    className=" h-20 cursor-pointer px-2 py-2  lg:px-10"
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
            ) : (
              // Fallback content for server-side rendering
              <div className="flex justify-center items-center space-x-4">
                {brands.brands.slice(0, 5).map((brand, index) => (
                  <div
                    key={"brand-fallback-" + index}
                    className="h-20 cursor-pointer px-2 py-2 lg:px-10 flex-shrink-0"
                  >
                    <div className="relative h-full w-20">
                      <ImageFallback
                        className="object-contain"
                        src={brand}
                        sizes="100vw"
                        alt=""
                        fill={true}
                        priority={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {/* <Cta /> */}
    </>
  );
};

export default Brands;
