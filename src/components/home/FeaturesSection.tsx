
import {
  CalendarDays,
  HeartHandshake,
  Leaf,
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

export default function FeaturesSection() {
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
