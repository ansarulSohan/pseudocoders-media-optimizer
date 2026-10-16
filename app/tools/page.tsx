import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Tools() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8f4]">
      <Header />
      <main className="flex-1 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">The toolkit</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Small tools. Lighter media.</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">Choose a task and get straight to work. Your files stay on your device while you use the tools.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Link href="/video-to-webm" className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-xl text-slate-900">▶</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white" aria-hidden="true">↗</span>
              </div>
              <h2 className="mt-8 text-xl font-semibold text-slate-950">Video to WebM</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">Convert a video into a web-friendly WebM file with quality controls and a preview.</p>
              <p className="mt-6 text-xs font-medium text-slate-400">MP4 · MOV · other video formats</p>
            </Link>
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/50 p-6 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-500">＋</div>
              <h2 className="mt-8 text-xl font-semibold text-slate-700">More tools soon</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">This toolkit is growing. Image optimization is on the roadmap.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
