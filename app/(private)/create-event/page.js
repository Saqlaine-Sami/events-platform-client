"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EventForm from "@/components/EventForm";
import { apiFetch } from "@/lib/api";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (values) => {
    try {
      setLoading(true);
      await apiFetch("/events", { method: "POST", body: values, auth: true });
      toast.success("ইভেন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/events"); // Upcoming Events পেজে redirect
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">
        Create Event
      </h1>
      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <div className="card-body">
          <EventForm
            onSubmit={handleCreate}
            submitLabel="Create Event"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}