import Link from "next/link";

export default function Banner() {
  return (
    <section
      className="relative bg-neutral bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          একসাথে গড়ি একটি সুন্দর সমাজ
        </h1>
        <p className="mt-5 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          শীতবস্ত্র বিতরণ, বৃক্ষরোপণ, রক্তদান — আপনার এলাকার সমাজসেবামূলক ইভেন্টে
          যোগ দিন অথবা নিজেই আয়োজন করুন।
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/events" className="btn btn-primary btn-lg">
            Upcoming Events
          </Link>
          <Link href="/create-event" className="btn btn-primary btn-lg">
            Create Event
          </Link>
        </div>
      </div>
    </section>
  );
}