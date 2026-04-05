import { howItWorksData } from "@/data/mockData";

export function HowItWorks() {
  return (
    <section className="bg-neutral-900 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs font-mono tracking-widest uppercase mb-3">
            Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {howItWorksData.map((item) => (
            <div key={item.step} className="relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-6 left-full w-full h-px bg-neutral-700 -ml-4 z-0" />

              <div className="relative z-10">
                <div className="text-amber-400 font-mono text-xs tracking-widest mb-4">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
