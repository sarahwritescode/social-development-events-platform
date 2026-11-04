
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Trash2,
  Users,
} from "lucide-react";

import { authClient, getJwtToken } from "@/lib/auth-client";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  createdById: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function UpcomingEventsSection() {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const currentUserId = session?.user?.id;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joiningId, setJoiningId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);
  const [actionMessage, setActionMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    
    let isMounted = true;

    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`);

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error("Unable to load events.");
        }

        if (isMounted) {
          setEvents(data.events.slice(0, 6));
        }
      } catch (err) {
        console.error("Events fetching error:", err);
        if (isMounted) {
          setError("Unable to load events. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchEvents();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  useEffect(() => {
    if (!session?.user) {
    return;
}

    let isMounted = true;

    const fetchJoinedEvents = async () => {
        try {
            const token = await getJwtToken();

            const response = await fetch(
                `${API_URL}/api/joined-events`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error("Failed to load joined events.");
            }

            const joinedList = data.joinedEvents || data.events || [];

            const joinedIds = joinedList
                .map(
                    (item: {
                        event?: { _id?: string };
                        eventId?: string;
                    }) => item.event?._id || item.eventId
                )
                .filter((id: string | undefined): id is string => Boolean(id));

            if (isMounted) {
                setJoinedEvents(joinedIds);
            }
        } catch (err) {
            console.error("Joined events fetching error:", err);
        }
    };

    void fetchJoinedEvents();

    return () => {
        isMounted = false;
    };
}, [session?.user?.id]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Join Event
  const handleJoin = async (eventId: string) => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    try {
      setJoiningId(eventId);
      setActionMessage("");

      const token = await getJwtToken();

      const response = await fetch(
        `${API_URL}/api/events/${eventId}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to join event.");
      }

      setJoinedEvents((prev) => [...prev, eventId]);
      setActionMessage("You have successfully joined the event!");
    } catch (err) {
      setActionMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setJoiningId("");
    }
  };

  // Delete Event
  const handleDelete = async (eventId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(eventId);
      setActionMessage("");

      const token = await getJwtToken();

      const response = await fetch(
        `${API_URL}/api/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete event.");
      }

      setEvents((prev) => prev.filter((event) => event._id !== eventId));
      setActionMessage("Event deleted successfully!");
    } catch (err) {
      setActionMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setDeletingId("");
    }
  };

  return (
    <section
      id="events"
      className="bg-[#f7f8f4] px-5 py-20 md:py-28 dark:bg-[#14271f]"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
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

        {/* Action Message */}
        {actionMessage && (
          <p className="mt-6 rounded-xl bg-[#e8eee5] p-4 text-sm font-semibold text-[#245c45] dark:bg-[#20392d] dark:text-[#dce9dc]">
            {actionMessage}
          </p>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-3xl bg-white dark:bg-[#20392d]"
              >
                <div className="h-56 bg-gray-200 dark:bg-[#30483d]" />
                <div className="space-y-4 p-6">
                  <div className="h-4 w-28 rounded bg-gray-200 dark:bg-[#40574a]" />
                  <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-[#40574a]" />
                  <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-[#40574a]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mt-12 rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
            <p className="font-semibold text-red-700">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                setError("");
                setRetryCount((count) => count + 1);
              }}
              className="mt-4 rounded-full bg-[#245c45] px-6 py-2.5 font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && events.length > 0 && (
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const isOwner = currentUserId === event.createdById;
              const isJoined = joinedEvents.includes(event._id);

              return (
                <article
                  key={event._id}
                  className="group overflow-hidden rounded-3xl border border-[#e7ebe3] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#183d32]/10 dark:border-[#40574a] dark:bg-[#20392d]"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold text-orange-800">
                      {event.eventType}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#47815c] dark:text-[#b8d3ad]">
                      <CalendarDays size={16} />
                      {formatDate(event.eventDate)}
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-[#183d32] dark:text-white">
                      {event.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-sm text-[#68766c] dark:text-[#bdcabe]">
                      <MapPin size={16} />
                      {event.location}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 space-y-3 border-t border-[#e8ece5] pt-5 dark:border-[#40574a]">

                      {/* View Event */}
                      <Link
                        href={`/events/${event._id}`}
                        className="flex items-center justify-between font-bold text-[#245c45] transition hover:text-[#47815c] dark:text-[#dce9dc]"
                      >
                        View Event

                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8eee5] transition group-hover:bg-[#245c45] group-hover:text-white dark:bg-[#30483d]">
                          <ArrowUpRight size={18} />
                        </span>
                      </Link>

                      {/* Join Button */}
                      {!isOwner && (
                        <button
                          onClick={() => handleJoin(event._id)}
                          disabled={joiningId === event._id || isJoined}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#245c45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#183d32] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Users size={17} />
                          {joiningId === event._id
                            ? "Joining..."
                            : isJoined
                              ? "Joined"
                              : "Join us"}
                        </button>
                      )}

                      {/* Owner Only Delete */}
                      {isOwner && (
                        <button
                          onClick={() => handleDelete(event._id)}
                          disabled={deletingId === event._id}
                          className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:hover:bg-red-950"
                        >
                          <Trash2 size={17} />
                          {deletingId === event._id
                            ? "Deleting..."
                            : "Delete Event"}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-[#cbd9c7] px-6 py-16 text-center dark:border-[#40574a]">
            <CalendarDays
              size={42}
              className="mx-auto text-[#47815c]"
            />

            <h3 className="mt-5 text-xl font-bold text-[#183d32] dark:text-white">
              No upcoming events yet
            </h3>

            <p className="mt-2 text-[#68766c] dark:text-[#bdcabe]">
              Be the first to create an event and make a difference!
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#245c45] px-6 py-3 font-bold text-white transition hover:bg-[#183d32]"
            >
              Create an Event <ArrowUpRight size={17} />
            </Link>
          </div>
        )}

        {/* Discover More */}
        {!loading && !error && events.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 rounded-full border border-[#cbd9c7] px-7 py-3.5 font-bold text-[#245c45] transition hover:bg-[#e8eee5] dark:border-[#40574a] dark:text-white dark:hover:bg-[#30483d]"
            >
              Discover more events <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
