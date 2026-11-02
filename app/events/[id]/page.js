"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaCalendarDays, FaLocationDot, FaUser } from "react-icons/fa6";
import { DetailsSkeleton } from "@/components/Skeletons";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [event, setEvent] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    apiFetch(`/events/${id}`)
      .then(setEvent)
      .catch((err) => {
        toast.error(err.message);
        setNotFound(true);
      });
  }, [id]);

  const handleJoin = async () => {
    // Details page সবাই দেখতে পারবে, কিন্তু Join করতে হলে লগইন লাগবে
    if (!session) {
      toast.error("ইভেন্টে জয়েন করতে আগে লগইন করুন");
      router.push("/login");
      return;
    }
    try {
      setJoining(true);
      await apiFetch(`/events/${id}/join`, { method: "POST", auth: true });
      toast.success("ইভেন্টে সফলভাবে জয়েন করেছেন!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setJoining(false);
    }
  };

  if (notFound) {
    return (
      <p className="text-center py-20 text-lg">ইভেন্টটি খুঁজে পাওয়া যায়নি।</p>
    );
  }
  if (!event) return <DetailsSkeleton />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-2">
      <img
        src={event.thumbnail}
        alt={event.title}
        className="w-full h-80 md:h-full max-h-[28rem] object-cover rounded-xl shadow-md"
      />

      <div className="space-y-4">
        <span className="badge badge-primary">{event.eventType}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          {event.title}
        </h1>
        <p className="flex items-center gap-2">
          <FaLocationDot className="text-primary" /> {event.location}
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarDays className="text-primary" /> {formatDate(event.date)}
        </p>
        <p className="flex items-center gap-2">
          <FaUser className="text-primary" /> Organized by {event.creatorName}
        </p>
        <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
          {event.description}
        </p>
        <button
          onClick={handleJoin}
          disabled={joining}
          className="btn btn-primary w-full"
        >
          {joining ? <span className="loading loading-spinner" /> : "Join Event"}
        </button>
      </div>
    </div>
  );
}