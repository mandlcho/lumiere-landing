import { Button } from "@/components/ui/button";
import { ctaData } from "@/data/mockData";

export function CTA() {
  return (
    <section className="bg-neutral-900 py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 mb-8">
          <span className="text-amber-400 text-2xl">✦</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          {ctaData.headline}
        </h2>

        <p className="text-neutral-400 text-lg mb-10">
          {ctaData.subheadline}
        </p>

        <Button
          size="lg"
          className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-10 text-sm h-12"
        >
          {ctaData.cta}
        </Button>

        <p className="text-neutral-600 text-xs mt-4">{ctaData.note}</p>
      </div>
    </section>
  );
}
