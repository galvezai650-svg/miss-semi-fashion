"use client";

export default function PageBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Dark gradient background (replacing video for faster load) */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 25%, #0a0a1a 50%, #0a1a0a 75%, #0a0a0a 100%)",
        }}
      />

      {/* Subtle shimmer overlay */}
      <div className="fixed inset-0 z-[1] bg-black/30" />

      {/* Page content above background */}
      <div className="relative z-[2]">
        {children}
      </div>
    </div>
  );
}
