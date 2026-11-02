

import Link from "next/link";
import { HeartHandshake, ArrowUpRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const footerLinks = {
  Explore: [
    { label: "Home", href: "/" },
    { label: "Upcoming Events", href: "/upcoming-events" },
    { label: "Create an Event", href: "/create-event" },
  ],
  Community: [
    { label: "Our Mission", href: "/#features" },
    { label: "Community Gallery", href: "/#community" },
    { label: "Join the Movement", href: "/register" },
  ],
  Account: [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "My Joined Events", href: "/joined-events" },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#14271f] px-5 pb-6 pt-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#b8d3ad] text-[#183d32]">
                <HeartHandshake size={25} />
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                kindora<span className="text-[#eac58f]">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Bringing kind-hearted people together to create stronger
              communities, support meaningful causes, and make every act
              of kindness count.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#b8d3ad] hover:bg-[#b8d3ad] hover:text-[#183d32]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-bold text-white">{heading}</h3>

              <ul className="mt-5 space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 text-sm text-white/60 transition hover:text-[#b8d3ad]"
                    >
                      {link.label}
                      <ArrowUpRight size={13} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
           © 2026 Kindora. Built with kindness.
          </p>

          <p>Small acts. Big changes. Stronger communities.</p>
        </div>
      </div>
    </footer>
  );
}
