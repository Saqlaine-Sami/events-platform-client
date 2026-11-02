"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import SectionTitle from "../SectionTitle";
import EventCard from "../EventCard";
import { GridSkeleton } from "../Skeletons";
import { apiFetch } from "@/lib/api";

export default function RecentEvents() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    // server MongoDB-র .limit(6) দিয়ে সর্বোচ্চ ৬টি ইভেন্ট পাঠায়
    apiFetch("/events?limit=6")
      .then(setEvents)
      .catch((err) => {
        toast.error(err.message);
        setEvents([]);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <SectionTitle
        title="Recent Upcoming Events"
        subtitle="খুব শীঘ্রই অনুষ্ঠিত হতে যাওয়া ইভেন্টগুলো দেখুন এবং অংশ নিন"
      />

      {events === null ? (
        <GridSkeleton count={6} />
      ) : events.length === 0 ? (
        <p className="text-center text-base-content/70">
          এখনো কোনো আপকামিং ইভেন্ট নেই।
        </p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/events" className="btn btn-primary">
              See All Events
            </Link>
          </div>
        </>
      )}
    </section>
  );
}