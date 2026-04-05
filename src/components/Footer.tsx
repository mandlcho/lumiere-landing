export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-amber-400">✦</span>
          <span className="text-white font-semibold text-sm">
            LumiereMotionLabs
          </span>
        </div>

        <p className="text-neutral-600 text-xs">
          © 2024 LumiereMotionLabs. AI-powered real estate visualization.
        </p>

        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-neutral-600 hover:text-neutral-400 text-xs transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
