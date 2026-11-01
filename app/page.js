import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      {/* Recent Upcoming Events section পরের ধাপে এখানে বসবে */}
      <Gallery />
      <Newsletter />
    </>
  );
}