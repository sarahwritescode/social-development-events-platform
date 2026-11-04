
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getJwtToken } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Community Support",
  "Other",
];

interface EventForm {
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
}

export default function CreateEventPage() {
  const router = useRouter();

  const [form, setForm] = useState<EventForm>({
    title: "",
    description: "",
    eventType: "",
    imageUrl: "",
    location: "",
    eventDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Local date format: YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    String(tomorrow.getDate()).padStart(2, "0"),
  ].join("-");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = await getJwtToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            eventDate: new Date(form.eventDate).toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create event");
      }

      alert("Event created successfully!");
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#10291f] px-4 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#62a77e]">
            Make a difference
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Create an Event
          </h1>

          <p className="mt-4 text-[#c3d5ca]">
            Bring people together and make a positive impact.
          </p>
        </div>

        <Card className="border border-[#315443] bg-[#18372a] text-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              Event Information
            </CardTitle>
            <CardDescription className="text-[#b6cabe]">
              Fill in the details to publish your community event.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Community Tree Plantation"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="border-[#456653] bg-[#10291f] text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell people about your event..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="border-[#456653] bg-[#10291f] text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <select
                  id="eventType"
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  required
                  className="h-10 w-full rounded-md border border-[#456653] bg-[#10291f] px-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#62a77e]"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Thumbnail Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={handleChange}
                  required
                  className="border-[#456653] bg-[#10291f] text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Event Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Dhanmondi, Dhaka"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="border-[#456653] bg-[#10291f] text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  min={minDate}
                  value={form.eventDate}
                  onChange={handleChange}
                  required
                  className="border-[#456653] bg-[#10291f] text-white [color-scheme:dark]"
                />
              </div>

              {error && (
                <p className="rounded-md bg-red-500/10 p-3 text-sm text-red-300">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#287052] py-6 text-base font-semibold text-white hover:bg-[#348b67]"
              >
                {loading ? "Creating Event..." : "Create Event"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
