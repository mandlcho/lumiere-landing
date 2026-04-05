"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollTransformProps {
  readonly className?: string;
}

export function ScrollTransform({ className = "" }: ScrollTransformProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = section.offsetHeight;

    // Progress from 0 (section enters) to 1 (section exits)
    const scrolled = -rect.top;
    const total = sectionHeight - windowHeight;
    const raw = scrolled / total;
    setProgress(Math.min(1, Math.max(0, raw)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Clip-path: starts fully left (0% revealed), ends fully right (100% revealed)
  const clipPercent = Math.round(progress * 100);

  return (
    <div ref={sectionRef} className={`relative h-[300vh] ${className}`}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950">
        {/* Label row */}
        <div className="absolute top-8 left-0 right-0 flex justify-between px-8 md:px-16 z-20 pointer-events-none">
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            Before
          </span>
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            After · AI Staged
          </span>
        </div>

        {/* Image comparison container */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
          {/* BEFORE image */}
          <RoomBefore />

          {/* AFTER image (revealed by clip) */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - clipPercent}% 0 0)`,
              transition: "clip-path 0.05s linear",
            }}
          >
            <RoomAfter />
          </div>

          {/* Divider line */}
          {clipPercent > 0 && clipPercent < 100 && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-[0_0_12px_4px_rgba(255,255,255,0.3)] z-10"
              style={{ left: `${clipPercent}%` }}
            />
          )}
        </div>

        {/* Progress indicator */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-100"
              style={{ width: `${clipPercent}%` }}
            />
          </div>
          <p className="text-neutral-500 text-xs font-mono">
            {clipPercent < 5
              ? "Scroll to reveal the transformation"
              : clipPercent > 95
              ? "AI staging complete"
              : `${clipPercent}% transformed`}
          </p>
        </div>

        {/* Scroll hint arrow */}
        {progress < 0.05 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

function RoomBefore() {
  return (
    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
      {/* CSS-drawn empty room */}
      <svg
        viewBox="0 0 800 450"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background wall */}
        <rect width="800" height="450" fill="#2a2a2a" />

        {/* Floor */}
        <polygon points="0,320 800,320 800,450 0,450" fill="#1e1a16" />
        {/* Floor boards */}
        {[340, 360, 380, 400, 420, 440].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="800"
            y2={y}
            stroke="#2a2520"
            strokeWidth="1"
          />
        ))}

        {/* Left wall */}
        <polygon points="0,0 160,80 160,380 0,450" fill="#222222" />

        {/* Right wall */}
        <polygon points="800,0 640,80 640,380 800,450" fill="#252525" />

        {/* Window */}
        <rect x="300" y="60" width="200" height="140" rx="2" fill="#3a4a5a" />
        <rect x="305" y="65" width="90" height="130" rx="1" fill="#4a6070" />
        <rect x="400" y="65" width="95" height="130" rx="1" fill="#4a6070" />
        {/* Window light */}
        <rect
          x="305"
          y="65"
          width="190"
          height="130"
          fill="url(#windowLight)"
          opacity="0.3"
        />
        <defs>
          <radialGradient id="windowLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a0c4e8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a0c4e8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Empty room label */}
        <text
          x="400"
          y="280"
          textAnchor="middle"
          fill="#555"
          fontSize="14"
          fontFamily="monospace"
        >
          Empty Property
        </text>

        {/* Baseboard */}
        <rect x="160" y="370" width="480" height="8" fill="#1a1a1a" />
      </svg>
    </div>
  );
}

function RoomAfter() {
  return (
    <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
      {/* CSS-drawn staged room */}
      <svg
        viewBox="0 0 800 450"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wall */}
        <rect width="800" height="320" fill="#f5f0ea" />

        {/* Accent wall panel */}
        <rect x="160" y="0" width="480" height="320" fill="#efe8de" />
        <rect x="200" y="20" width="400" height="270" fill="none" stroke="#d4c9bb" strokeWidth="2" rx="2" />

        {/* Floor - warm wood */}
        <polygon points="0,320 800,320 800,450 0,450" fill="#c8a87a" />
        {/* Wood grain */}
        {[335, 355, 375, 395, 415, 435].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="800"
            y2={y}
            stroke="#b8986a"
            strokeWidth="1"
          />
        ))}

        {/* Left wall */}
        <polygon points="0,0 160,80 160,380 0,450" fill="#ede6da" />
        {/* Right wall */}
        <polygon points="800,0 640,80 640,380 800,450" fill="#e8e0d4" />

        {/* Large window */}
        <rect x="290" y="50" width="220" height="160" rx="3" fill="#b8d4e8" />
        <rect x="295" y="55" width="100" height="150" fill="#c8dff0" />
        <rect x="400" y="55" width="105" height="150" fill="#c8dff0" />
        {/* Window light effect */}
        <polygon
          points="295,205 400,205 500,280 160,280"
          fill="#f0e8d0"
          opacity="0.3"
        />

        {/* Sofa */}
        <rect x="220" y="255" width="360" height="65" rx="8" fill="#8B7355" />
        <rect x="220" y="240" width="360" height="25" rx="4" fill="#9B8365" />
        {/* Sofa cushions */}
        <rect x="230" y="242" width="100" height="58" rx="6" fill="#7a6248" />
        <rect x="340" y="242" width="100" height="58" rx="6" fill="#7a6248" />
        <rect x="450" y="242" width="120" height="58" rx="6" fill="#7a6248" />
        {/* Sofa legs */}
        <rect x="235" y="318" width="12" height="10" rx="2" fill="#5a4838" />
        <rect x="553" y="318" width="12" height="10" rx="2" fill="#5a4838" />

        {/* Coffee table */}
        <rect x="310" y="310" width="180" height="8" rx="2" fill="#d4c4a0" />
        <rect x="322" y="318" width="10" height="14" rx="1" fill="#c4b490" />
        <rect x="468" y="318" width="10" height="14" rx="1" fill="#c4b490" />

        {/* Floor lamp */}
        <rect x="165" y="180" width="4" height="140" rx="2" fill="#888" />
        <ellipse cx="167" cy="178" rx="22" ry="14" fill="#f0e0a0" opacity="0.9" />

        {/* Plant */}
        <rect x="598" y="270" width="22" height="30" rx="3" fill="#7a5c3a" />
        <ellipse cx="609" cy="268" rx="28" ry="35" fill="#4a7a4a" />
        <ellipse cx="595" cy="255" rx="18" ry="22" fill="#5a8a5a" />
        <ellipse cx="622" cy="260" rx="16" ry="20" fill="#3a6a3a" />

        {/* Art on wall */}
        <rect x="340" y="80" width="120" height="80" rx="3" fill="#d4c8b8" stroke="#c4b8a8" strokeWidth="2" />
        <rect x="350" y="90" width="100" height="60" fill="#e8d8c0" />
        {/* Abstract art lines */}
        <line x1="360" y1="100" x2="420" y2="140" stroke="#a09080" strokeWidth="2" />
        <line x1="410" y1="95" x2="380" y2="145" stroke="#b0a090" strokeWidth="1.5" />
        <circle cx="390" cy="120" r="15" fill="none" stroke="#c0b0a0" strokeWidth="1.5" />

        {/* Throw pillow on sofa */}
        <rect x="460" y="245" width="45" height="45" rx="5" fill="#c4a882" />

        {/* AI badge */}
        <rect x="580" y="385" width="140" height="28" rx="14" fill="#1a1a1a" opacity="0.8" />
        <text x="650" y="403" textAnchor="middle" fill="#f0c060" fontSize="11" fontFamily="system-ui" fontWeight="600">
          ✦ AI Staged
        </text>
      </svg>
    </div>
  );
}
