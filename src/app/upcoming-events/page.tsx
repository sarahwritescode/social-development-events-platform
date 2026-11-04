
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowUpRight, ArrowLeft } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Event = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
};

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load events.");
        }

        setEvents(data.events || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f7f1] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
  <Link
    href="/"
    className="inline-flex items-center gap-2 rounded-full border border-[#dce5d8] bg-white px-5 py-2.5 text-sm font-semibold text-[#315c3b] transition hover:bg-[#eaf1e6]"
  >
    <ArrowLeft size={17} />
    Back to Home
  </Link>
</div>

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[3px] text-[#66866a]">
            Be Part of Something Good
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#24452e] md:text-5xl">
            Upcoming Events
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Discover meaningful events, connect with your community,
            and make a positive difference together.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="py-16 text-center font-medium text-[#315c3b]">
            Loading events...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="rounded-xl bg-red-50 p-5 text-center text-red-600">
            {error}
          </p>
        )}

        {/* Empty */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl bg-white p-12 text-center">
            <h2 className="text-xl font-bold text-[#24452e]">
              No upcoming events yet
            </h2>
            <p className="mt-2 text-gray-500">
              Check back soon for new community events.
            </p>
          </div>
        )}

        {/* Event Cards */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-[#e5eadf] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-56 overflow-hidden bg-[#eaf1e6]">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">
                      🌿
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-[#eaf1e6] px-3 py-1 text-xs font-bold text-[#315c3b]">
                    {event.eventType}
                  </span>

                  <h2 className="mt-4 line-clamp-1 text-xl font-bold text-[#24452e]">
                    {event.title}
                  </h2>

                  <div className="mt-4 space-y-3 text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#66866a]" />
                      {event.location}
                    </p>

                    <p className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-[#66866a]" />
                      {new Date(event.eventDate).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#315c3b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#24452e]"
                  >
                    View Event
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
