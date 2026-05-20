"use client";

import { useEffect, useRef } from "react";

export default function PageBackground({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked — try on first interaction
        const handleInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener("click", handleInteraction);
          document.removeEventListener("touchstart", handleInteraction);
        };
        document.addEventListener("click", handleInteraction);
        document.addEventListener("touchstart", handleInteraction);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Full-page background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.4) contrast(1.1)" }}
      >
        <source src="/videos/page-bg.mp4" type="video/mp4" />
      </video>

      {/* Subtle overlay — light enough so video is clearly visible */}
      <div className="fixed inset-0 z-[1] bg-black/25" />

      {/* Page content above video */}
      <div className="relative z-[2]">
        {children}
      </div>
    </div>
  );
}
