"use client";

import { useEffect, useRef, useState } from "react";

export default function PageBackground({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative min-h-screen">
      {/* Full-page background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/videos/page-bg.mp4" type="video/mp4" />
      </video>

      {/* Semi-transparent overlay so text remains readable */}
      <div className="fixed inset-0 z-[1] bg-[#FAFAF8]/75" />

      {/* Page content above video */}
      <div className="relative z-[2]">
        {children}
      </div>
    </div>
  );
}
