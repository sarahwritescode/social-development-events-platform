
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  HeartHandshake,
  Leaf,
  MapPin,
  Recycle,
  Users,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: CalendarDays,
    title: "Find your purpose",
    description:
      "Discover meaningful community events happening around you and find a cause that matters to you.",
  },
  {
    number: "02",
    icon: HeartHandshake,
    title: "Make real connections",
    description:
      "Meet people who share your passion for helping others and build stronger, kinder communities.",
  },
  {
    number: "03",
    icon: Leaf,
    title: "Create lasting change",
    description:
      "Turn small acts of kindness into a lasting impact through consistent community action.",
  },
];

const events = [
  {
    id: "1",
    title: "Winter Warmth Drive",
    category: "Donation",
    location: "Mirpur 10, Dhaka",
    date: "Nov 15, 2026",
    image:
      "photo-1489493585363-d69421e0edd3",
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "2",
    title: "Green Dhaka Initiative",
    category: "Plantation",
    location: "Dhanmondi, Dhaka",
    date: "Nov 18, 2026",
    image:
      "photo-1416879595882-3373a0480b5b",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "3",
    title: "A Cleaner Tomorrow",
    category: "Cleanup",
    location: "Hatirjheel, Dhaka",
    date: "Nov 22, 2026",
    image:
      "photo-1558618666-fcd25c85cd64",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "4",
    title: "Share a Warm Meal",
    category: "Food Donation",
    location: "Mohammadpur, Dhaka",
    date: "Nov 25, 2026",
    image:
      "photo-1593113598332-cd288d649433",
    color: "bg-amber-100 text-amber-800",
  },
  {
    id: "5",
    title: "Books for Bright Futures",
    category: "Education",
    location: "Uttara, Dhaka",
    date: "Nov 28, 2026",
    image:
      "photo-1503676260728-1c00da094a0b",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "6",
    title: "Care for Our Elders",
    category: "Community Care",
    location: "Gulshan, Dhaka",
    date: "Dec 02, 2026",
    image:
      "photo-1511632765486-a01980e01a18",
    color: "bg-rose-100 text-rose-800",
  },
];

const gallery = [
  {
    image: "photo-1559027615-cd4628902d4a",
    title: "Hands that help",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    image: "photo-1469571486292-0ba58a3f068b",
    title: "Together outdoors",
    className: "",
  },
  {
    image: "photo-1531206715517-5c0ba140b2b8",
    title: "Community spirit",
    className: "",
  },
  {
    image: "photo-1593113598332-cd288d649433",
    title: "Sharing kindness",
    className: "md:col-span-2",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-white px-5 py-20 md:py-28 dark:bg-[#193126]">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[3px] text-[#47815c]">
            WHY KINDORA
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#183d32] sm:text-5xl dark:text-white">
            Good things happen
            <br />
            <span className="text-[#47815c] dark:text-[#a4c89e]">
              when we come together.
            </span>
          </h2>
          <p className="mt-5 leading-7 text-[#68766c] dark:text-[#bdcabe]">
            Making a difference should be simple. We bring people, causes, and
            opportunities together in one place.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="group rounded-3xl border border-[#e6ebe3] bg-[#fafbf8] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#b7ceb2] hover:shadow-xl hover:shadow-[#183d32]/5 sm:p-9 dark:border-[#40574a] dark:bg-[#20392d]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8eee5] text-[#245c45] transition group-hover:bg-[#245c45] group-hover:text-white dark:bg-[#30483d] dark:text-[#dce9dc]">
                    <Icon size={26} />
                  </div>
                  <span className="text-sm font-bold text-[#b2bdb0]">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-[#183d32] dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-[#68766c] dark:text-[#bdcabe]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function UpcomingEventsSection() {
  return (
    <section id="events" className="bg-[#f7f8f4] px-5 py-20 md:py-28 dark:bg-[#14271f]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold tracking-[3px] text-[#47815c]">
              MAKE A DIFFERENCE
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#183d32] sm:text-5xl dark:text-white">
              Find your next
              <br className="sm:hidden" /> opportunity.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-[#68766c] dark:text-[#bdcabe]">
              Real people. Meaningful causes. Small steps toward a better
              tomorrow.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex w-fit items-center gap-2 font-bold text-[#245c45] transition hover:gap-3 dark:text-[#b8d3ad]"
          >
            Explore all events <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-3xl border border-[#e7ebe3] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#183d32]/10 dark:border-[#40574a] dark:bg-[#20392d]"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${event.image}?auto=format&fit=crop&w=850&q=80`}
                  alt={event.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${event.color}`}
                >
                  {event.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm font-medium text-[#47815c] dark:text-[#b8d3ad]">
                  <CalendarDays size={16} />
                  {event.date}
                </div>

                <h3 className="mt-3 text-xl font-bold text-[#183d32] dark:text-white">
                  {event.title}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-[#68766c] dark:text-[#bdcabe]">
                  <MapPin size={16} />
                  {event.location}
                </div>

                <div className="mt-6 border-t border-[#e8ece5] pt-5 dark:border-[#40574a]">
                  <Link
                    href={`/events/${event.id}`}
                    className="flex items-center justify-between font-bold text-[#245c45] transition hover:text-[#47815c] dark:text-[#dce9dc]"
                  >
                    View Event
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8eee5] transition group-hover:bg-[#245c45] group-hover:text-white dark:bg-[#30483d]">
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-full border border-[#cbd9c7] px-7 py-3.5 font-bold text-[#245c45] transition hover:bg-[#e8eee5] dark:border-[#40574a] dark:text-white dark:hover:bg-[#30483d]"
          >
            Discover more events <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section id="community" className="bg-white px-5 py-20 md:py-28 dark:bg-[#193126]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold tracking-[3px] text-[#47815c]">
              MOMENTS THAT MATTER
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#183d32] sm:text-5xl dark:text-white">
              A little kindness
              <br />
              goes a long way.
            </h2>
          </div>

          <p className="max-w-sm leading-7 text-[#68766c] dark:text-[#bdcabe]">
            Every helping hand tells a story. Here&apos;s to the people making our
            communities a better place.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[190px] gap-4 sm:grid-cols-2 md:auto-rows-[220px] md:grid-cols-4">
          {gallery.map((item, index) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-3xl ${item.className}`}
            >
              <img
                src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=1000&q=85`}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14271f]/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <span className="text-xs font-bold text-[#eac58f]">
                    KINDORA COMMUNITY
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    {item.title}
                  </h3>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
