import {
  FaCalendarPlus,
  FaListCheck,
  FaMapLocationDot,
  FaPeopleGroup,
} from "react-icons/fa6";
import SectionTitle from "../SectionTitle";

const features = [
  {
    icon: FaCalendarPlus,
    title: "সহজে ইভেন্ট তৈরি",
    text: "মাত্র কয়েকটি তথ্য দিয়েই আপনার সমাজসেবামূলক ইভেন্ট তৈরি করুন।",
  },
  {
    icon: FaPeopleGroup,
    title: "এক ক্লিকে জয়েন",
    text: "পছন্দের ইভেন্টে এক ক্লিকেই জয়েন করে সমাজসেবায় অংশ নিন।",
  },
  {
    icon: FaMapLocationDot,
    title: "নিজের এলাকার ইভেন্ট",
    text: "আপনার এলাকার চলমান ও আসন্ন ইভেন্টগুলো এক জায়গায় দেখুন।",
  },
  {
    icon: FaListCheck,
    title: "সহজ ম্যানেজমেন্ট",
    text: "নিজের তৈরি ইভেন্ট আপডেট বা ডিলিট এবং জয়েন করা ইভেন্ট ট্র্যাক করুন।",
  },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <SectionTitle
        title="Why Choose Us"
        subtitle="সমাজসেবাকে আরও সহজ ও সংগঠিত করতে আমাদের প্ল্যাটফর্মের প্রধান সুবিধাগুলো"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="card bg-base-100 border border-base-300 shadow-md h-full"
          >
            <div className="card-body items-center text-center">
              <f.icon className="text-4xl text-primary" />
              <h3 className="card-title mt-2">{f.title}</h3>
              <p className="text-sm text-base-content/70">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}