import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroData, statsData } from "@/data/mockData";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-center px-6 pt-24 pb-0 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(251,191,36,0.1),transparent)]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <Badge
          variant="outline"
          className="border-amber-400/30 text-amber-400 bg-amber-400/5 text-xs tracking-widest uppercase mb-6 px-4 py-1.5"
        >
          {heroData.badge}
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-4">
          {heroData.headline}
          <br />
          <span className="text-amber-400">{heroData.headlineAccent}</span>
        </h1>

        <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mt-6 mb-10 leading-relaxed">
          {heroData.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Button
            size="lg"
            className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold px-8 text-sm"
          >
            {heroData.ctaPrimary}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white text-sm"
          >
            <span className="mr-2">▶</span>
            {heroData.ctaSecondary}
          </Button>
        </div>

        {/* Room preview teaser — hints at the transformation below */}
        <div className="relative w-full max-w-3xl mx-auto rounded-t-2xl overflow-hidden aspect-[16/7] ring-1 ring-white/10 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80&auto=format&fit=crop"
            alt="AI staged luxury living room"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover object-center"
            priority
          />
          {/* Gradient fade to section below */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
          {/* Floating label */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-amber-400/30 rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-white text-xs font-medium">AI Generated · Scroll to see how</span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 w-full max-w-3xl border-t border-neutral-800/60 pt-8 pb-12 mt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-neutral-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
