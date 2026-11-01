"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import FormField from "./FormField";
import { EVENT_TYPES, tomorrowDhaka, validateEvent } from "@/lib/validators";

export default function EventForm({ initial, onSubmit, submitLabel, loading }) {
  // শুধু প্রয়োজনীয় ফিল্ড নেওয়া হচ্ছে (_id, creatorEmail ইত্যাদি বাদ)
  const [values, setValues] = useState({
    title: initial?.title || "",
    description: initial?.description || "",
    eventType: initial?.eventType || "",
    thumbnail: initial?.thumbnail || "",
    location: initial?.location || "",
    date: initial?.date || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateEvent(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error(Object.values(errs)[0]);
      return;
    }
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Event Title" error={errors.title}>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          className="input w-full"
          placeholder="যেমন: শীতবস্ত্র বিতরণ"
        />
      </FormField>

      <FormField label="Event Type" error={errors.eventType}>
        <select
          name="eventType"
          value={values.eventType}
          onChange={handleChange}
          className="select w-full"
        >
          <option value="" disabled>
            Select event type
          </option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Thumbnail Image URL" error={errors.thumbnail}>
        <input
          name="thumbnail"
          value={values.thumbnail}
          onChange={handleChange}
          className="input w-full"
          placeholder="https://..."
        />
      </FormField>

      <FormField label="Location" error={errors.location}>
        <input
          name="location"
          value={values.location}
          onChange={handleChange}
          className="input w-full"
          placeholder="যেমন: Mirpur 10, Dhaka"
        />
      </FormField>

      <FormField label="Event Date" error={errors.date}>
        <input
          type="date"
          name="date"
          min={tomorrowDhaka()}
          value={values.date}
          onChange={handleChange}
          className="input w-full"
        />
      </FormField>

      <FormField label="Description" error={errors.description}>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={5}
          className="textarea w-full"
          placeholder="ইভেন্ট সম্পর্কে বিস্তারিত লিখুন"
        />
      </FormField>

      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading ? <span className="loading loading-spinner" /> : submitLabel}
      </button>
    </form>
  );
}