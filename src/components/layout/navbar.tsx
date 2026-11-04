
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HeartHandshake,
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  LogOut,
  CalendarDays,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, isPending } = useAuth();
  const router = useRouter();

  // Theme toggle
  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
  };

  // Logout
  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      setIsMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

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

          {user && (
            <Link
              href="/manage-events"
              className="flex items-center gap-2 text-sm font-semibold text-[#526157] transition hover:text-[#245c45] dark:text-[#c3d0c5]"
            >
              <CalendarDays size={16} />
              Manage Events
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border-[#e1e7df] text-[#245c45] hover:bg-[#e8eee5] dark:border-[#40574a] dark:text-[#f3c78d] dark:hover:bg-[#30483d]"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </Button>

          {!isPending && (
            user ? (
              <div className="flex items-center gap-3">
                <span className="max-w-[150px] truncate text-sm font-semibold text-[#245c45] dark:text-[#edf5ec]">
                  Hi, {user.name}
                </span>

                <Button
                  variant="outline"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="rounded-full"
                >
                  <LogOut size={16} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#245c45] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#183d32]"
                >
                  Join Kindora
                  <ArrowUpRight size={16} />
                </Link>
              </>
            )
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border-[#e1e7df] text-[#245c45] dark:border-[#40574a] dark:text-[#f3c78d]"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="rounded-full bg-[#e8eee5] text-[#245c45] hover:bg-[#dce7d9] dark:bg-[#30483d] dark:text-white"
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-[#e5e9e1] bg-[#f7f8f4] px-5 py-5 dark:border-[#30483d] dark:bg-[#14271f] md:hidden">

          <div className="flex flex-col gap-5">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-sm font-semibold text-[#245c45] dark:text-white"
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <Link
                href="/manage-events"
                onClick={closeMenu}
                className="flex items-center gap-2 text-sm font-semibold text-[#245c45] dark:text-white"
              >
                <CalendarDays size={17} />
                Manage Events
              </Link>
            )}

            <div className="flex flex-col gap-3 border-t border-[#e5e9e1] pt-4 dark:border-[#30483d]">

              {!isPending && (
                user ? (
                  <>
                    <p className="text-sm font-semibold text-[#245c45] dark:text-white">
                      Hi, {user.name}
                    </p>

                    <Button
                      variant="outline"
                      disabled={isLoggingOut}
                      onClick={handleLogout}
                      className="w-full rounded-full"
                    >
                      <LogOut size={16} />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="inline-flex h-9 w-full items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={closeMenu}
                      className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[#245c45] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#183d32]"
                    >
                      Join Kindora
                      <ArrowUpRight size={16} />
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
