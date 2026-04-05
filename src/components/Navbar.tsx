"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-lg">✦</span>
          <span className="text-white font-semibold tracking-tight text-sm">
            LumiereMotionLabs
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Pricing"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-neutral-400 hover:text-white text-sm transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-400 hover:text-white hidden md:flex"
          >
            Sign in
          </Button>
          <Button
            size="sm"
            className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs px-4"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
