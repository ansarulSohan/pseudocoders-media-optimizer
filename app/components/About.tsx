import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.8fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">A little more clarity</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Your media stays yours. The workflow stays simple.</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            MediaKit is a small collection of practical tools for everyday media tasks. Start with video conversion, choose the quality that suits your project, and keep working without sending files elsewhere.
          </p>
          <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-lime-300 transition hover:text-lime-200">
            How it works <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <span className="text-2xl text-lime-300">⌂</span>
            <p className="mt-8 text-sm font-semibold">On your device</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">Browser-based processing keeps the files local.</p>
          </div>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <span className="text-2xl text-lime-300">◷</span>
            <p className="mt-8 text-sm font-semibold">Ready when you are</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">No account or setup is required to use the tools.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
