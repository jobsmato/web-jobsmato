"use client";
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageFallback = (props) => {
  const { src, fallback,className,sizes,responsiveSizes, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div
    className={responsiveSizes || className} // Supports responsive height/width via classes
    style={{ position: "relative" }}
  >
    <Image
      {...rest}
      className="banner-img object-cover rounded-lg "
      src={imgSrc}
      sizes={sizes} // Handles different sizes for different screen sizes
      onError={() => {
        setImgSrc(fallback);
      }}
    />
        </div>

  );
};

export default ImageFallback;
