"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

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

  const clipPercent = Math.round(progress * 100);

  return (
    <div ref={sectionRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950">
        {/* Label row */}
        <div className="absolute top-8 left-0 right-0 flex justify-between px-8 md:px-16 z-20 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-500 inline-block" />
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              Before
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              AI Staged
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          </div>
        </div>

        {/* Image comparison */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5">
          {/* BEFORE — empty unfurnished room */}
          <Image
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=85&auto=format&fit=crop"
            alt="Empty room before AI staging"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />

          {/* AFTER — beautifully staged room, revealed by scroll */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - clipPercent}% 0 0)`,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85&auto=format&fit=crop"
              alt="AI-staged room after transformation"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
            {/* AI badge overlay */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm border border-amber-400/30 rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <span className="text-amber-400 text-xs">✦</span>
              <span className="text-amber-400 text-xs font-medium tracking-wide">
                AI Staged
              </span>
            </div>
          </div>

          {/* Divider line */}
          {clipPercent > 1 && clipPercent < 99 && (
            <div
              className="absolute top-0 bottom-0 w-[2px] z-10 pointer-events-none"
              style={{ left: `${clipPercent}%` }}
            >
              <div className="w-full h-full bg-white/90 shadow-[0_0_16px_4px_rgba(255,255,255,0.4)]" />
              {/* Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-neutral-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l-3 3 3 3M16 9l3 3-3 3"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="w-48 h-0.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-75"
              style={{ width: `${clipPercent}%` }}
            />
          </div>
          <p className="text-neutral-500 text-xs font-mono">
            {clipPercent < 3
              ? "↓ scroll to reveal"
              : clipPercent > 97
              ? "✦ transformation complete"
              : `${clipPercent}% transformed`}
          </p>
        </div>

        {/* Scroll hint */}
        {progress < 0.04 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <svg
              className="w-5 h-5 text-neutral-400"
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
