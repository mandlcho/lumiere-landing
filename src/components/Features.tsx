import { featuresData } from "@/data/mockData";

export function Features() {
  return (
    <section className="bg-neutral-950 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs font-mono tracking-widest uppercase mb-3">
            Capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Built for Real Estate Professionals
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {featuresData.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-amber-400/30 hover:bg-neutral-900 transition-all duration-300"
            >
              <div className="text-amber-400 text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
