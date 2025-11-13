import Header from "../components/Header";
import Team from "../components/Team";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main>
        <Team />
      </main>
      <Footer />
    </div>
  );
}

