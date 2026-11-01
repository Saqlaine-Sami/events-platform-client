import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaHandHoldingHeart,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-primary mb-3">
            <FaHandHoldingHeart /> HelpingHands BD
          </div>
          <p className="text-sm opacity-80">
            একটি কমিউনিটি-ভিত্তিক প্ল্যাটফর্ম, যেখানে আপনি আপনার এলাকার সমাজসেবামূলক
            ইভেন্ট তৈরি করতে, যোগ দিতে এবং ট্র্যাক করতে পারবেন।
          </p>
        </div>

        <div>
          <h6 className="font-semibold mb-3 text-lg">Quick Links</h6>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/events" className="hover:text-primary">Upcoming Events</Link></li>
            <li><Link href="/login" className="hover:text-primary">Login</Link></li>
            <li><Link href="/register" className="hover:text-primary">Register</Link></li>
          </ul>
        </div>

        <div>
          <h6 className="font-semibold mb-3 text-lg">Contact</h6>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Mirpur 10, Dhaka, Bangladesh</li>
            <li>support@helpinghands.bd</li>
            <li>+880 1700-000000</li>
          </ul>
        </div>

        <div>
          <h6 className="font-semibold mb-3 text-lg">Follow Us</h6>
          <div className="flex gap-3">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-outline btn-sm" aria-label="X">
              <FaXTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-outline btn-sm" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-outline btn-sm" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-outline btn-sm" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} HelpingHands BD. All rights reserved.
      </div>
    </footer>
  );
}