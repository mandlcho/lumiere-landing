import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroData, statsData } from "@/data/mockData";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,191,36,0.08),transparent)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
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

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
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

        {/* Scroll prompt */}
        <p className="text-neutral-600 text-xs font-mono mt-12 tracking-widest">
          ↓ SCROLL TO SEE THE MAGIC
        </p>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 mt-auto w-full max-w-3xl border-t border-neutral-800 pt-8 mt-16">
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
