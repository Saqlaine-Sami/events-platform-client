"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import EventForm from "@/components/EventForm";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";

export default function ManageEventsPage() {
  const [events, setEvents] = useState(null); // null মানে এখনো লোড হচ্ছে
  const [editing, setEditing] = useState(null); // যে ইভেন্ট edit হচ্ছে
  const [saving, setSaving] = useState(false);

  const loadEvents = () =>
    apiFetch("/my-events", { auth: true })
      .then(setEvents)
      .catch((err) => {
        toast.error(err.message);
        setEvents([]);
      });

  useEffect(() => {
    loadEvents();
  }, []);

  const handleUpdate = async (values) => {
    try {
      setSaving(true);
      await apiFetch(`/events/${editing._id}`, {
        method: "PUT",
        body: values,
        auth: true,
      });
      toast.success("ইভেন্ট সফলভাবে আপডেট হয়েছে!");
      setEditing(null);
      await loadEvents();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (event) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `"${event.title}" ইভেন্টটি স্থায়ীভাবে ডিলিট হয়ে যাবে।`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "বাতিল",
    });
    if (!result.isConfirmed) return;

    try {
      await apiFetch(`/events/${event._id}`, { method: "DELETE", auth: true });
      toast.success("ইভেন্ট ডিলিট হয়েছে");
      setEvents((prev) => prev.filter((e) => e._id !== event._id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
        Manage Events
      </h1>

      {events === null ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-16 w-full" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-base-content/70">
          আপনি এখনো কোনো ইভেন্ট তৈরি করেননি।
        </p>
      ) : (
        <div className="overflow-x-auto border border-base-300 rounded-xl">
          <table className="table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Type</th>
                <th>Location</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <span className="font-semibold">{event.title}</span>
                    </div>
                  </td>
                  <td>{event.eventType}</td>
                  <td>{event.location}</td>
                  <td>{formatDate(event.date)}</td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditing(event)}
                        className="btn btn-primary btn-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(event)}
                        className="btn btn-primary btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {editing && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl text-primary mb-4">Update Event</h3>
            <EventForm
              initial={editing}
              onSubmit={handleUpdate}
              submitLabel="Save Changes"
              loading={saving}
            />
            <div className="modal-action">
              <button
                onClick={() => setEditing(null)}
                className="btn btn-primary btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}