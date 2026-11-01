import SectionTitle from "../SectionTitle";

const images = Array.from({ length: 8 }, (_, i) => `/gallery/${i + 1}.jpg`);

export default function Gallery() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <SectionTitle
        title="Our Gallery"
        subtitle="বিভিন্ন সমাজসেবামূলক ইভেন্টের কিছু স্মরণীয় মুহূর্ত"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src) => (
          <div key={src} className="overflow-hidden rounded-xl aspect-square">
            <img
              src={src}
              alt="Community service event"
              className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}