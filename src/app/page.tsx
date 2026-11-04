

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Users,
  HandHeart,
  MapPin,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/layout/navbar";
import FeaturesSection from "@/components/home/FeaturesSection";
import UpcomingEventsSection from "@/components/home/UpcomingEventsSection";
import GallerySection from "@/components/home/GallerySection";
import NewsletterSection from "@/components/home/NewsletterSection";
import Footer from "@/components/layout/Footer";


const impactStats = [
  {
    number: "2,500+",
    label: "People supported",
    icon: Users,
  },
  {
    number: "180+",
    label: "Community events",
    icon: HandHeart,
  },
  {
    number: "35+",
    label: "Local communities",
    icon: Heart,
  },
];

export default function Home() {
  return (
    <main className="flex-1 bg-[#f7f8f4] dark:bg-[#14271f]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">

          {/* Hero Content */}
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dce7da] bg-[#edf3e9] px-4 py-2 dark:border-[#40574a] dark:bg-[#243c30]">
              <Sparkles size={15} className="text-[#d28b43]" />
              <span className="text-xs font-bold tracking-wide text-[#245c45] dark:text-[#dce9dc]">
                TOGETHER, WE MAKE A DIFFERENCE
              </span>
            </div>

            <h1 className="max-w-2xl text-5xl leading-[1.12] font-extrabold tracking-tight text-[#183d32] sm:text-6xl lg:text-[68px] dark:text-[#f1f5ed]">
              Small Acts.
              <br />
              <span className="relative inline-block text-[#47815c] dark:text-[#a4c89e]">
                Big Changes.
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8C75 1 190 1 296 7"
                    stroke="#E8A45B"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-8 text-[#68766c] sm:text-lg dark:text-[#bdcabe]">
              Every community has the power to create change. Discover local
              volunteering events, connect with kind-hearted people, and
              turn your good intentions into meaningful action.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/upcoming-events"
                className="group flex items-center gap-3 rounded-full bg-[#245c45] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#245c45]/15 transition duration-300 hover:-translate-y-1 hover:bg-[#183d32]"
              >
                Explore Events
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/create-event"
                className="flex items-center gap-2 rounded-full border border-[#d6dfd3] px-7 py-4 text-sm font-bold text-[#245c45] transition hover:bg-[#e8eee5] dark:border-[#40574a] dark:text-[#e4eee2] dark:hover:bg-[#30483d]"
              >
                Start an Initiative
                <ArrowUpRight size={17} />
              </Link>
            </div>

            {/* Small Trust Section */}
            <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-[#e4e9e0] pt-7 dark:border-[#30483d]">
              <div className="flex -space-x-3">
                {[
                  "photo-1534528741775-53994a69daeb",
                  "photo-1500648767791-00dcc994a43e",
                  "photo-1531123897727-8f129e1688ce",
                  "photo-1506794778202-cad84cf45f1d",
                ].map((photo, index) => (
                  <img
                    key={photo}
                    src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=100&q=80`}
                    alt={`Community member ${index + 1}`}
                    className="h-10 w-10 rounded-full border-[3px] border-[#f7f8f4] object-cover dark:border-[#14271f]"
                  />
                ))}
              </div>

              <div>
                <div className="flex items-center gap-1 text-[#e8a45b]">
                  {"★★★★★"}
                </div>
                <p className="text-xs font-medium text-[#68766c] dark:text-[#bdcabe]">
                  A community built on kindness
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto w-full max-w-[580px]">
            <div className="absolute -right-5 -top-5 h-40 w-40 rounded-full bg-[#e8a45b]/20 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-[#91b795]/30 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px]">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1100&q=85"
                alt="Volunteers working together to support their community"
                className="h-[430px] w-full object-cover sm:h-[540px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#14271f]/50 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 right-7">
                <p className="text-xs font-bold tracking-[2px] text-[#eac58f]">
                  THE POWER OF COMMUNITY
                </p>
                <h2 className="mt-2 max-w-sm text-3xl leading-tight font-bold text-white">
                  Together, we can do more.
                </h2>
              </div>
            </div>

            {/* Floating Impact Card */}
            <div className="absolute -bottom-7 -left-5 flex items-center gap-3 rounded-2xl border border-[#e9eee6] bg-white p-4 shadow-xl sm:-left-12 sm:p-5 dark:border-[#40574a] dark:bg-[#243c30]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8eee5] text-[#245c45] dark:bg-[#40574a] dark:text-[#dce9dc]">
                <HandHeart size={25} />
              </div>

              <div>
                <p className="text-xl font-extrabold text-[#183d32] dark:text-white">
                  Be the reason
                </p>
                <p className="text-xs text-[#68766c] dark:text-[#bdcabe]">
                  someone smiles today
                </p>
              </div>
            </div>

            {/* Location Badge */}
            <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-md dark:bg-[#243c30]">
              <MapPin size={15} className="text-[#47815c]" />
              <span className="text-xs font-bold text-[#183d32] dark:text-white">
                Starting locally
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="border-y border-[#e4e9e0] bg-[#eef2e9] dark:border-[#30483d] dark:bg-[#1b3227]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 px-5 py-10 sm:grid-cols-3 lg:px-8">
          {impactStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#47815c] dark:bg-[#30483d] dark:text-[#b8d3ad]">
                  <Icon size={23} />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-[#183d32] dark:text-white">
                    {stat.number}
                  </h3>
                  <p className="text-sm text-[#68766c] dark:text-[#bdcabe]">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <FeaturesSection />
      <UpcomingEventsSection />
      <GallerySection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}

