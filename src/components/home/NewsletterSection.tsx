"use client";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="bg-[#f7f8f4] px-5 py-16 md:py-24 dark:bg-[#14271f]">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#183d32] px-6 py-12 sm:px-12 md:py-16 lg:px-16">
        {/* Decorative circles */}
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-5 -top-12 h-52 w-52 rounded-full border border-white/10" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#47815c]/20 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-[#eac58f]">
              <Sparkles size={15} />
              A LITTLE GOOD IN YOUR INBOX
            </div>

            <h2 className="mt-6 max-w-lg text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl">
              Good news.
              <br />
              Good people.
              <br />
              <span className="text-[#b8d3ad]">Good change.</span>
            </h2>

            <p className="mt-5 max-w-md leading-7 text-white/70">
              Get updates about upcoming volunteer opportunities, inspiring
              community stories, and new ways to make a difference.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eac58f]/15 text-[#eac58f]">
              <Mail size={24} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-white">
              Stay connected
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/65">
              Be the first to hear about meaningful opportunities near you.
            </p>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#b8d3ad]"
              />

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-[#eac58f] px-5 py-3.5 text-sm font-bold text-[#183d32] transition hover:bg-white"
              >
                Subscribe
                <ArrowRight size={17} />
              </button>
            </form>

            <p className="mt-4 text-xs text-white/45">
              Made for people who believe small acts matter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
