"use client";

import { useEffect, useRef, useState } from "react";

// GSAP + ScrollTrigger loaded dynamically (avoids SSR issues)
export function VideoScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    let gsap: typeof import("gsap").gsap;
    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
    let ctx: ReturnType<typeof gsap.context>;

    const init = async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      gsap = gsapMod.gsap;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const video = videoRef.current;
      const container = containerRef.current;
      const bar = progressBarRef.current;
      const label = labelRef.current;
      if (!video || !container) return;

      const setupScrollTrigger = () => {
        if (video.duration === 0 || isNaN(video.duration)) return;
        setVideoReady(true);

        ctx = gsap.context(() => {
          // Scrub video currentTime based on scroll position
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=3000",
              scrub: 0.5,
              pin: stickyRef.current,
              anticipatePin: 1,
              onUpdate: (self) => {
                // Update progress bar and label manually
                const p = Math.round(self.progress * 100);
                if (bar) bar.style.width = `${p}%`;
                if (label) {
                  if (p < 3) label.textContent = "↓ scroll to explore";
                  else if (p > 97) label.textContent = "✦ staging complete";
                  else label.textContent = `${p}% revealed`;
                }
              },
            },
          });

          tl.to(video, {
            currentTime: video.duration,
            ease: "none",
          });
        });
      };

      if (video.readyState >= 2) {
        setupScrollTrigger();
      } else {
        video.addEventListener("loadedmetadata", setupScrollTrigger, {
          once: true,
        });
      }
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        className="h-screen flex flex-col items-center justify-center bg-neutral-950 overflow-hidden"
      >
        {/* Labels */}
        <div className="absolute top-8 left-0 right-0 flex justify-between px-8 md:px-16 z-20 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 inline-block" />
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              Before
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              AI Staged
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
          </div>
        </div>

        {/* Video container */}
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5 aspect-[16/9]">
          {/* Loading state */}
          {!videoReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                <span className="text-neutral-500 text-xs font-mono">
                  Loading transformation…
                </span>
              </div>
            </div>
          )}

          {/* Scroll-scrubbed video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={() => setVideoReady(true)}
          >
            {/* HD source first, fallback to SD */}
            <source
              src="https://videos.pexels.com/video-files/29466011/12684175_2560_1440_30fps.mp4"
              type="video/mp4"
            />
            <source
              src="https://videos.pexels.com/video-files/29466011/12684175_640_360_60fps.mp4"
              type="video/mp4"
            />
          </video>

          {/* AI Staged badge */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm border border-amber-400/30 rounded-full px-3 py-1.5 flex items-center gap-1.5 z-10">
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-amber-400 text-xs font-medium tracking-wide">
              AI Staged
            </span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 flex flex-col items-center gap-2 w-full max-w-5xl px-4">
          <div className="w-full h-px bg-neutral-800 relative">
            <div
              ref={progressBarRef}
              className="absolute left-0 top-0 h-px bg-amber-400 transition-none"
              style={{ width: "0%" }}
            />
          </div>
          <p
            ref={labelRef}
            className="text-neutral-500 text-xs font-mono self-start"
          >
            ↓ scroll to explore
          </p>
        </div>
      </div>
    </div>
  );
}
