
"use client";

import { useState, useEffect, useRef } from "react";
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
  User,
  ChevronDown,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Upcoming Events", href: "/upcoming-events" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const { user, isPending } = useAuth();
  const router = useRouter();

  // Theme toggle
  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      setIsProfileOpen(false);
      setIsMenuOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  // Avatar fallback
  const avatarLetter =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  // Reusable avatar dropdown JSX
  const profileMenu = (
    <div ref={profileRef} className="relative">
      <button
        type="button"
        onClick={() => setIsProfileOpen((prev) => !prev)}
        aria-label="Open profile menu"
        aria-expanded={isProfileOpen}
        className="flex items-center gap-2 rounded-full p-1 transition hover:bg-[#e8eee5] dark:hover:bg-[#30483d]"
      >
        {user?.image ? (
          <img
            src={user.image}
            alt={user.name || "User avatar"}
            className="h-10 w-10 rounded-full border-2 border-[#245c45] object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#245c45] bg-[#e8eee5] text-sm font-bold text-[#245c45] dark:bg-[#30483d] dark:text-white">
            {avatarLetter}
          </div>
        )}

        <ChevronDown
          size={16}
          className={`text-[#245c45] transition-transform dark:text-white ${isProfileOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 top-14 z-[60] w-56 overflow-hidden rounded-xl border border-[#e5e9e1] bg-white shadow-xl dark:border-[#30483d] dark:bg-[#14271f]">

          {/* User Information */}
          <div className="border-b border-[#e5e9e1] px-4 py-3 dark:border-[#30483d]">
            <p className="truncate text-sm font-bold text-[#245c45] dark:text-white">
              {user?.name}
            </p>

            <p className="truncate text-xs text-gray-500">
              {user?.email}
            </p>
          </div>


          {/* Dropdown Links */}
          <div className="p-2">

            <Link
              href="/creat-event"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#526157] transition hover:bg-[#e8eee5] dark:text-white dark:hover:bg-[#30483d]"
            >
              <CalendarDays size={17} />
              Create Event
            </Link>

            <Link
              href="/manage-events"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#526157] transition hover:bg-[#e8eee5] dark:text-white dark:hover:bg-[#30483d]"
            >
              <CalendarDays size={17} />
              Manage Events
            </Link>

            <Link
              href="/joined-events"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#526157] transition hover:bg-[#e8eee5] dark:text-white dark:hover:bg-[#30483d]"
            >
              <HeartHandshake size={17} />
              Joined Events
            </Link>

            <Link
              href="/profile"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#526157] transition hover:bg-[#e8eee5] dark:text-white dark:hover:bg-[#30483d]"
            >
              <User size={17} />
              My Profile
            </Link>

            <button
              type="button"
              disabled={isLoggingOut}
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950"
            >
              <LogOut size={17} />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>

          </div>

        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e9e1] bg-[#f7f8f4]/95 backdrop-blur-xl dark:border-[#30483d] dark:bg-[#14271f]/95">

      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          href="/"
          className="flex items-center gap-2.5"
        >
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
              profileMenu
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

          {!isPending && user && profileMenu}

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

            {!isPending && !user && (
              <div className="flex flex-col gap-3 border-t border-[#e5e9e1] pt-4 dark:border-[#30483d]">

                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="inline-flex h-9 w-full items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[#245c45] px-4 py-2 text-sm font-medium text-white hover:bg-[#183d32]"
                >
                  Join Kindora
                  <ArrowUpRight size={16} />
                </Link>

              </div>
            )}

          </div>
        </div>
      )}

    </header>
  );
}
