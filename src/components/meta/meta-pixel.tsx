"use client";

import Script from "next/script";

export const MetaPixel = () => {
  return (
    <Script
      src="/api/meta"
      onLoad={() => {
        console.log("Pixel loaded");
      }}
    />
  );
};
