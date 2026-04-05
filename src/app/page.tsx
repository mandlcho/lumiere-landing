import { Hero } from "@/components/Hero";
import { ScrollTransform } from "@/components/ScrollTransform";
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
          Watch AI stage an empty room in real-time as you scroll
        </p>
      </div>

      <ScrollTransform />

      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
