import Header from "../components/Header";
import Footer from "../components/Footer";

const steps = [
  { title: "Choose a file", body: "Select a video saved on your device. Files up to 300 MB are supported." },
  { title: "Pick a quality", body: "Choose a lower, balanced, or higher quality preset for your needs." },
  { title: "Preview and save", body: "Review the WebM result, then download it when you are ready." },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8f4]">
      <Header />
      <main className="flex-1 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">About MediaKit</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Useful media tools, with your privacy built in.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">MediaKit helps make common media tasks feel straightforward. Video conversion runs in your browser, so your original file stays on your device.</p>
          <section className="mt-14 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <h2 className="text-xl font-semibold text-slate-950">How video conversion works</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.title} className="border-t border-slate-200 pt-5">
                  <span className="text-xs font-semibold tracking-widest text-lime-700">0{index + 1}</span>
                  <h3 className="mt-3 font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{step.body}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
