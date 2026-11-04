
import { ArrowUpRight } from "lucide-react";

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

export default function GallerySection() {
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
          {gallery.map((item) => (
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
