
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Loader2,
} from "lucide-react";

import { authClient, getJwtToken } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  createdBy: string;
}

export default function EventDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/events/${params.id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Event not found.");
        }

        setEvent(data.event);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load event."
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEvent();
    }
  }, [params.id]);

  // Join event
  const handleJoin = async () => {
    if (!session?.user) {
      router.push("/sign-in");
      return;
    }

    try {
      setJoining(true);
      setMessage("");

      const token = await getJwtToken();

      const response = await fetch(
        `${API_URL}/api/events/${params.id}/join`,
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

      setJoined(true);
      setMessage("You have successfully joined this event!");
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setJoining(false);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  if (loading || isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14271f] text-white">
        <Loader2 className="animate-spin" size={35} />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#14271f] px-5 text-center text-white">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <p className="mt-3 text-[#bdcabe]">
          {error || "This event does not exist."}
        </p>
        <Link
          href="/upcoming-events"
          className="mt-6 rounded-full bg-[#245c45] px-6 py-3 font-bold"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-5 py-12 dark:bg-[#14271f]">
      <div className="mx-auto max-w-5xl">

        {/* Back Button */}
        <Link
          href="/upcoming-events"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-[#245c45] dark:text-[#b8d3ad]"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Event Image */}
        <div className="overflow-hidden rounded-3xl bg-[#20392d]">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-[280px] w-full object-cover sm:h-[450px]"
          />
        </div>

        {/* Event Details */}
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_300px]">

          <div>
            <span className="inline-block rounded-full bg-[#e8eee5] px-4 py-2 text-sm font-bold text-[#245c45] dark:bg-[#30483d] dark:text-[#dce9dc]">
              {event.eventType}
            </span>

            <h1 className="mt-5 text-3xl font-extrabold text-[#183d32] sm:text-4xl dark:text-white">
              {event.title}
            </h1>

            <div className="mt-6 space-y-4 text-[#68766c] dark:text-[#bdcabe]">
              <div className="flex items-center gap-3">
                <CalendarDays className="text-[#47815c]" />
                <span>{formatDate(event.eventDate)}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-[#47815c]" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Users className="text-[#47815c]" />
                <span>Community Event</span>
              </div>
            </div>

            <div className="mt-10 border-t border-[#dce5d9] pt-8 dark:border-[#40574a]">
              <h2 className="text-2xl font-bold text-[#183d32] dark:text-white">
                About This Event
              </h2>

              <p className="mt-4 whitespace-pre-line leading-8 text-[#68766c] dark:text-[#bdcabe]">
                {event.description}
              </p>

              {event.createdBy && (
                <p className="mt-6 text-sm text-[#68766c] dark:text-[#bdcabe]">
                  Organized by: {event.createdBy}
                </p>
              )}
            </div>
          </div>

          {/* Join Card */}
          <aside className="h-fit rounded-3xl border border-[#e7ebe3] bg-white p-6 shadow-sm dark:border-[#40574a] dark:bg-[#20392d]">
            <h2 className="text-xl font-bold text-[#183d32] dark:text-white">
              Join This Event
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#68766c] dark:text-[#bdcabe]">
              Be part of something meaningful. Join this event and make a difference.
            </p>

            {message && (
              <p className="mt-4 rounded-xl bg-[#e8eee5] p-3 text-sm font-medium text-[#245c45] dark:bg-[#30483d] dark:text-white">
                {message}
              </p>
            )}

            <button
              onClick={handleJoin}
              disabled={joining || joined}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#245c45] px-5 py-3.5 font-bold text-white transition hover:bg-[#183d32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {joining ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Joining...
                </>
              ) : joined ? (
                "Joined Successfully"
              ) : (
                "Join Event"
              )}
            </button>

            {!session?.user && (
              <p className="mt-3 text-center text-xs text-[#68766c] dark:text-[#bdcabe]">
                Please login to join this event.
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
