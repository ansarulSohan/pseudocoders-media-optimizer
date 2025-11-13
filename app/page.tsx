import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import VideoCompressor from "./video-to-webm/page";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
      </main>
      <Footer />
    </div>
  );
}
