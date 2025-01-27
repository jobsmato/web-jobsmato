"use client";

import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import { useRef } from "react";
import { TbQuote } from "react-icons/tb";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import InfiniteTestimonialSlider from "@layouts/partials/TestiomonialsNew";


const Testimonial = ({ testimonial }) => {
  const testimonialPaginationRef = useRef(null);
  return (
    <section className="section pt-0">
      <div className="container">
        <div className="animate text-center">
          <p>{testimonial.subtitle}</p>
          {markdownify(testimonial.title, "h2", "mt-4 section-title")}
          {markdownify(testimonial.description, "p", "mt-10")}
        </div>
        <div className="animate row mt-10 items-center justify-center">
          <div className="xl:col-11">
            <div className="row items-center justify-center">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
