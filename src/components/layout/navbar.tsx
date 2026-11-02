
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HeartHandshake,
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e9e1] bg-[#f7f8f4]/95 backdrop-blur-xl dark:border-[#30483d] dark:bg-[#14271f]/95">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#245c45] text-white">
            <HeartHandshake size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#183d32] dark:text-[#edf5ec]">
              kindora<span className="text-[#e8a45b]">.</span>
            </h1>
            <p className="-mt-1 text-[9px] font-semibold uppercase tracking-[2px] text-[#758176]">
              Make every act count
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#526157] transition hover:text-[#245c45] dark:text-[#c3d0c5] dark:hover:text-[#e8a45b]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e7df] text-[#245c45] transition hover:bg-[#e8eee5] dark:border-[#40574a] dark:text-[#f3c78d] dark:hover:bg-[#30483d]"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <Link
            href="/login"
            className="rounded-full px-4 py-2.5 text-sm font-bold text-[#245c45] transition hover:bg-[#e8eee5] dark:text-white dark:hover:bg-[#30483d]"
          >
            Login
          </Link>

          <Link
            href="/create-event"
            className="flex items-center gap-2 rounded-full bg-[#245c45] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#183d32] hover:shadow-lg"
          >
            Create Event
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e7df] text-[#245c45] dark:border-[#40574a] dark:text-[#f3c78d]"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8eee5] text-[#245c45] dark:bg-[#30483d] dark:text-white"
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-[#e5e9e1] bg-[#f7f8f4] px-5 py-5 dark:border-[#30483d] dark:bg-[#14271f] md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-semibold text-[#245c45] dark:text-white"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold text-[#245c45] dark:text-white"
            >
              Login
            </Link>

            <Link
              href="/create-event"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-[#245c45] px-5 py-3 text-sm font-bold text-white"
            >
              Create Event
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
