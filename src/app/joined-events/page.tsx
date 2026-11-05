"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { useAuth } from "@/components/auth/AuthProvider";
import { getJwtToken } from "@/lib/auth-client";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
}

interface EventsResponse {
  success?: boolean;
  events?: Event[];
  message?: string;
}

interface JoinedEventReference {
  _id?: string;
  event?: { _id?: string };
  eventId?: string;
}

interface JoinedEventsResponse {
  success?: boolean;
  joinedEvents?: JoinedEventReference[];
  events?: JoinedEventReference[];
  message?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function JoinedEventsPage() {
  const { user, isPending } = useAuth();
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    let isMounted = true;

    const fetchJoinedEvents = async () => {
      try {
        const token = await getJwtToken();
        const [eventsResponse, joinedResponse] = await Promise.all([
          fetch(`${API_URL}/api/events`),
          fetch(`${API_URL}/api/joined-events`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const eventsData: EventsResponse = await eventsResponse.json();
        const joinedData: JoinedEventsResponse = await joinedResponse.json();

        if (!eventsResponse.ok || !eventsData.success) {
          throw new Error(eventsData.message || "Failed to load events.");
        }
        if (!joinedResponse.ok || !joinedData.success) {
          throw new Error(
            joinedData.message || "Failed to load your joined events."
          );
        }

        const joinedList = joinedData.joinedEvents ?? joinedData.events ?? [];
        const joinedIds = new Set(
          joinedList
            .map((item) => item.event?._id ?? item.eventId ?? item._id)
            .filter((id): id is string => Boolean(id))
        );

        if (isMounted) {
          setEvents(
            (eventsData.events ?? []).filter((event) =>
              joinedIds.has(event._id)
            )
          );
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Unable to load your joined events."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchJoinedEvents();

    return () => {
      isMounted = false;
    };
  }, [isPending, router, user]);

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-5 py-12 dark:bg-[#14271f]">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#245c45] transition hover:bg-[#e8eee5] dark:text-[#c3d0c5] dark:hover:bg-[#30483d]"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <header className="py-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-[#47815c]">
            Your community
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#183d32] dark:text-white md:text-5xl">
            Joined Events
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[#68766c] dark:text-[#bdcabe]">
            Events you have joined and the causes you are supporting.
          </p>
        </header>

        {loading && (
          <p className="py-16 text-center font-medium text-[#526157] dark:text-[#c3d0c5]">
            Loading your events...
          </p>
        )}

        {!loading && error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 p-5 text-center text-red-700"
          >
            {error}
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-[#e5e9e1] bg-white px-6 py-14 text-center dark:border-[#30483d] dark:bg-[#18372a]">
            <h2 className="text-xl font-bold text-[#183d32] dark:text-white">
              You haven&apos;t joined any events yet
            </h2>
            <p className="mt-2 text-sm text-[#68766c] dark:text-[#bdcabe]">
              Find an event and join your community in making a difference.
            </p>
            <Link
              href="/upcoming-events"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#245c45] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#183d32]"
            >
              Explore Events
              <ArrowUpRight size={17} />
            </Link>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl border border-[#e5e9e1] bg-white shadow-sm dark:border-[#30483d] dark:bg-[#18372a]"
              >
                <div className="h-52 overflow-hidden bg-[#e8eee5] dark:bg-[#30483d]">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl">
                      🌿
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-[#e8eee5] px-3 py-1 text-xs font-bold text-[#245c45] dark:bg-[#30483d] dark:text-white">
                    {event.eventType}
                  </span>
                  <h2 className="mt-4 line-clamp-1 text-xl font-bold text-[#183d32] dark:text-white">
                    {event.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-[#68766c] dark:text-[#bdcabe]">
                    {event.description}
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-[#68766c] dark:text-[#bdcabe]">
                    <p className="flex items-center gap-2">
                      <MapPin size={16} aria-hidden="true" />
                      {event.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarDays size={16} aria-hidden="true" />
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <Link
                    href={`/events/${event._id}`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#245c45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#183d32]"
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
