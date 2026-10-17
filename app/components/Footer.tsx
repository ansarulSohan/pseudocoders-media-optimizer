import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-xs text-lime-300">M</span>
          MediaKit
        </Link>
        <p>Useful media tools. Private by design.</p>
        <nav className="flex gap-5" aria-label="Footer navigation">
          <Link href="/tools" className="transition hover:text-slate-900">Tools</Link>
          <Link href="/about" className="transition hover:text-slate-900">About</Link>
          <span>© {new Date().getFullYear()}</span>
        </nav>
      </div>
    </footer>
  );
}
