import { Hero } from "@/components/Hero";
import { VideoScrollSection } from "@/components/VideoScrollSection";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-neutral-950">
      <Navbar />
      <Hero />

      {/* Section label */}
      <div className="bg-neutral-950 py-8 px-6 text-center">
        <p className="text-amber-400 text-xs font-mono tracking-widest uppercase">
          Scroll to Transform
        </p>
        <p className="text-neutral-500 text-sm mt-1">
          Scroll through an AI-staged luxury property — frame by frame
        </p>
      </div>

      <VideoScrollSection />

      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
