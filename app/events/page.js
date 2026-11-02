"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EventCard from "@/components/EventCard";
import { GridSkeleton } from "@/components/Skeletons";
import { apiFetch } from "@/lib/api";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState(null); // null মানে এখনো লোড হচ্ছে

  useEffect(() => {
    apiFetch("/events")
      .then(setEvents)
      .catch((err) => {
        toast.error(err.message);
        setEvents([]);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
        Upcoming Events
      </h1>

      {events === null ? (
        <GridSkeleton count={6} />
      ) : events.length === 0 ? (
        <p className="text-center text-base-content/70">
          এখনো কোনো আপকামিং ইভেন্ট নেই।
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}