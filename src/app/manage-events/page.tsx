
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, X, Save, CalendarDays, MapPin } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getJwtToken } from "@/lib/auth-client";
import Link from "next/link";

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

type EventForm = {
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
};

const emptyForm: EventForm = {
  title: "",
  description: "",
  eventType: "Cleanup",
  imageUrl: "",
  location: "",
  eventDate: "",
};

export default function ManageEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (isPending || !session) return;

    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        const token = await getJwtToken();

        const response = await fetch(`${API_URL}/api/my-events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load your events.");
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

    fetchMyEvents();
  }, [isPending, session]);

  const startEditing = (event: Event) => {
    setEditingId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      imageUrl: event.imageUrl,
      location: event.location,
      eventDate: new Date(event.eventDate).toLocaleDateString("en-CA"),
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleUpdate = async (eventId: string) => {
    try {
      setSaving(true);
      setError("");

      const token = await getJwtToken();

      const response = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          eventDate: new Date(form.eventDate).toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update the event.");
      }

      setEvents((previousEvents) =>
        previousEvents.map((event) =>
          event._id === eventId ? { ...event, ...form } : event
        )
      );

      cancelEditing();
      alert("Event updated successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      const token = await getJwtToken();

      const response = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete the event.");
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== eventId)
      );

      alert("Event deleted successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

 
if (isPending || loading) {
  return (
    <main className="min-h-screen bg-[#f5f7f1] flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#dce8d9] border-t-[#315c3b]" />
        <p className="font-medium text-[#315c3b]">
          Loading your events...
        </p>
      </div>
    </main>
  );
}

if (!session) return null;

return (
  <main className="min-h-screen bg-[#f5f7f1] px-4 py-12 md:py-16">
    <div className="mx-auto max-w-7xl">

      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-[#183d32] px-7 py-10 md:px-12 md:py-14">
        <div className="relative z-10 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[3px] text-[#b6cba9]">
            Your Dashboard
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
            Manage Your
            <span className="block text-[#e8b878]">Community Events</span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-7 text-[#d2dfd2] md:text-base">
            Keep your events organized. Update details, make changes,
            or remove events whenever you need.
          </p>

          <button
            onClick={() => router.push("/creat-event")}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#e8b878] px-6 py-3 text-sm font-bold text-[#183d32] transition hover:bg-[#f2ca94]"
          >
            + Create New Event
          </button>
        </div>

        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[35px] border-white/5" />
        <div className="absolute -bottom-28 right-24 h-64 w-64 rounded-full bg-[#315c3b]/50 blur-2xl" />
      </section>

      {/* Event Count */}
      <section className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#24452e]">
            Your Events
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage all the events you have created.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e2e9dd] bg-white px-6 py-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Total Events
          </p>
          <p className="mt-1 text-3xl font-bold text-[#315c3b]">
            {events.length}
          </p>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Empty State */}
      {events.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-[#cbd9c5] bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf1e6] text-3xl">
            🌱
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#24452e]">
            No events yet!
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Start making a difference in your community by creating
            your first event.
          </p>

          <button
            onClick={() => router.push("/create-event")}
            className="mt-6 rounded-full bg-[#315c3b] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#24452e]"
          >
            Create Your First Event
          </button>
        </div>
      ) : (
        <section className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <article
              key={event._id}
              className="group overflow-hidden rounded-3xl border border-[#e5eadf] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-[#eaf1e6]">
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

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#315c3b] shadow-sm">
                  {event.eventType}
                </span>
              </div>

              {editingId === event._id ? (
                /* Edit Form */
                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#66866a]">
                      Update Details
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-[#24452e]">
                      Edit Event
                    </h3>
                  </div>

                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Event title"
                    className="w-full rounded-xl border border-[#dce5d8] bg-[#f9faf7] p-3 text-sm outline-none focus:border-[#315c3b]"
                    required
                  />

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Description"
                    rows={3}
                    className="w-full rounded-xl border border-[#dce5d8] bg-[#f9faf7] p-3 text-sm outline-none focus:border-[#315c3b]"
                    required
                  />

                  <select
                    value={form.eventType}
                    onChange={(e) =>
                      setForm({ ...form, eventType: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#dce5d8] bg-[#f9faf7] p-3 text-sm outline-none focus:border-[#315c3b]"
                  >
                    {[
                      "Cleanup",
                      "Plantation",
                      "Donation",
                      "Education",
                      "Community Support",
                      "Other",
                    ].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <input
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm({ ...form, imageUrl: e.target.value })
                    }
                    placeholder="Image URL"
                    className="w-full rounded-xl border border-[#dce5d8] bg-[#f9faf7] p-3 text-sm outline-none focus:border-[#315c3b]"
                    required
                  />

                  <input
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="Location"
                    className="w-full rounded-xl border border-[#dce5d8] bg-[#f9faf7] p-3 text-sm outline-none focus:border-[#315c3b]"
                    required
                  />

                  <input
                    type="date"
                    value={form.eventDate}
                    min={new Date().toLocaleDateString("en-CA")}
                    onChange={(e) =>
                      setForm({ ...form, eventDate: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#dce5d8] bg-[#f9faf7] p-3 text-sm outline-none focus:border-[#315c3b]"
                    required
                  />

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleUpdate(event._id)}
                      disabled={saving}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#315c3b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#24452e] disabled:opacity-60"
                    >
                      <Save size={16} />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      onClick={cancelEditing}
                      className="flex items-center justify-center gap-2 rounded-xl border border-[#dce5d8] px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Event Information */
                <div className="p-6">
                  <h3 className="line-clamp-1 text-xl font-bold text-[#24452e]">
                    {event.title}
                  </h3>

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

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                    {event.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#edf0e9] pt-5">
                    <button
                      onClick={() => startEditing(event)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#eaf1e6] px-4 py-3 text-sm font-bold text-[#315c3b] transition hover:bg-[#dce9d7]"
                    >
                      <Edit size={16} />
                      Edit Event
                    </button>

                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  </main>
)}