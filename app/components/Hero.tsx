import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f7f8f4]">
      <div className="pointer-events-none absolute -right-28 -top-44 h-[520px] w-[520px] rounded-full bg-lime-200/40 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:py-28">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-lime-500" /> Files stay on your device
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[68px]">
            Smaller files.
            <span className="mt-2 block text-slate-400">More room to create.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            A focused set of tools for lighter media. Convert video to WebM right in your browser, with no upload and no account.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/video-to-webm" className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800">
              Try video compressor <span className="text-lime-300" aria-hidden="true">↗</span>
            </Link>
            <Link href="/tools" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950">
              Explore tools
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-2"><span className="text-lime-600">✓</span> No files uploaded</span>
            <span className="flex items-center gap-2"><span className="text-lime-600">✓</span> Free to use</span>
            <span className="flex items-center gap-2"><span className="text-lime-600">✓</span> Works in your browser</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -left-7 top-16 hidden h-28 w-28 rounded-[30px] border border-lime-300/70 bg-lime-200/50 sm:block" />
          <div className="absolute -bottom-7 -right-5 hidden h-36 w-36 rounded-full border border-slate-200 bg-white/70 sm:block" />
          <div className="relative rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_28px_90px_-38px_rgba(15,23,42,.30)] sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Video compressor</p>
                <p className="mt-1 text-xs text-slate-500">A lighter format, in a few clicks</p>
              </div>
              <div className="flex gap-1.5" aria-hidden="true"><i className="h-2 w-2 rounded-full bg-slate-200"/><i className="h-2 w-2 rounded-full bg-slate-200"/><i className="h-2 w-2 rounded-full bg-slate-200"/></div>
            </div>
            <div className="mt-5 rounded-2xl bg-[#f5f6f2] p-5 sm:p-7">
              <div className="flex aspect-[1.55] items-center justify-center overflow-hidden rounded-xl bg-slate-900">
                <div className="relative h-full w-full bg-[radial-gradient(ellipse_at_28%_22%,rgba(217,249,157,.76),transparent_28%),radial-gradient(ellipse_at_76%_68%,rgba(45,212,191,.58),transparent_34%),linear-gradient(135deg,#23352e_0%,#162022_52%,#344337_100%)]">
                  <div className="absolute left-[15%] top-[23%] h-24 w-24 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm sm:h-32 sm:w-32" />
                  <div className="absolute bottom-[16%] right-[15%] h-20 w-36 -rotate-12 rounded-[45%] border border-lime-100/50 bg-lime-100/15 blur-[1px] sm:h-24 sm:w-48" />
                  <span className="absolute inset-0 flex items-center justify-center"><span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/15 text-xl text-white backdrop-blur-md">▶</span></span>
                  <span className="absolute bottom-3 left-3 rounded-md bg-black/35 px-2 py-1 text-[10px] font-medium text-white/90">TRAILER_04.MP4</span>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div><p className="text-xs text-slate-500">Original size</p><p className="mt-1 text-sm font-semibold text-slate-900">48.2 MB</p></div>
                <div className="flex flex-1 items-center justify-center text-slate-300" aria-hidden="true"><span className="h-px w-full bg-slate-200"/><span className="-ml-1 rounded-full bg-white px-2 text-lg">→</span></div>
                <div className="text-right"><p className="text-xs text-slate-500">WebM estimate</p><p className="mt-1 text-sm font-semibold text-slate-900">Smaller file</p></div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
              <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-100 text-sm">↗</span><span className="text-xs font-medium text-slate-700">Private, in-browser processing</span></div>
              <span className="rounded-full bg-lime-100 px-2.5 py-1 text-[10px] font-semibold text-lime-800">READY</span>
            </div>
          </div>
          <div className="absolute -right-2 top-12 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-lg sm:-right-8">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Your files</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">Stay local <span className="text-lime-600">✓</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
