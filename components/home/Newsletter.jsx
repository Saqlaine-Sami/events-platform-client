"use client";

export default function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="rounded-2xl bg-primary text-primary-content px-6 py-14 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Subscribe to Our Newsletter</h2>
        <p className="mt-3 opacity-90 max-w-xl mx-auto">
          নতুন নতুন ইভেন্টের খবর সবার আগে পেতে আপনার ইমেইল দিয়ে সাবস্ক্রাইব করুন।
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="আপনার ইমেইল"
            className="input w-full text-base-content"
          />
          <button type="submit" className="btn btn-neutral">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}