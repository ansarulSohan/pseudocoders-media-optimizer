const features = [
  {
    number: "01",
    title: "Private by default",
    description: "Your video is processed in your browser. The file never gets sent to a server.",
    icon: "↗",
  },
  {
    number: "02",
    title: "Simple controls",
    description: "Choose a quality preset, see the result, and download when it looks right.",
    icon: "⌘",
  },
  {
    number: "03",
    title: "No account needed",
    description: "Open the tool and get started. No sign-up, subscription, or upload queue.",
    icon: "◎",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">Made for a lighter workflow</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Less friction between you and done.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-500">Everything runs on your device, so your media remains yours from start to finish.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.number} className="group rounded-3xl border border-slate-200 bg-[#fafbf8] p-6 transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest text-slate-400">{feature.number}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-100 text-xl text-slate-900">{feature.icon}</span>
              </div>
              <h3 className="mt-9 text-lg font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
