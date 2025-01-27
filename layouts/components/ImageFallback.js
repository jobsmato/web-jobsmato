"use client";
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageFallback = (props) => {
  const { src, fallback,className,sizes, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      className={className}
      src={imgSrc}
      sizes={sizes} // Handles different sizes for different screen sizes

      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};

export default ImageFallback;
