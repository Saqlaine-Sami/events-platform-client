# HelpingHands BD — Social Development Events Platform

🌐 **Live Site:** https://events-platform-client-alpha.vercel.app

একটি কমিউনিটি-ভিত্তিক প্ল্যাটফর্ম, যেখানে ইউজাররা তাদের এলাকার সমাজসেবামূলক ইভেন্ট (যেমন শীতবস্ত্র বিতরণ, বৃক্ষরোপণ, রক্তদান) তৈরি করতে, জয়েন করতে এবং ট্র্যাক করতে পারে।

## Key Features

- Email/Password এবং GitHub দিয়ে Login ও Register (BetterAuth + MongoDB Adapter)
- লগইন করা ইউজার নতুন ইভেন্ট তৈরি করতে পারে; অতীতের তারিখ দেওয়া যায় না
- Upcoming Events পেজে শুধু আসন্ন ইভেন্ট দেখায়, তারিখ পার হওয়া ইভেন্ট দেখায় না
- এক ক্লিকে ইভেন্টে Join করা এবং Joined Events পেজে তারিখ অনুযায়ী সাজানো তালিকা দেখা
- Manage Events পেজ থেকে নিজের ইভেন্ট Update ও Delete; শুধু ইভেন্টের মালিক এটা করতে পারে
- JWT দিয়ে সুরক্ষিত API এবং Private Route (reload করলেও লগইন থাকে)
- Light/Dark theme toggle, পুরো সাইট একসাথে বদলায়
- Loading skeleton এবং Profile view/update (নাম ও ছবি)
- মোবাইল, ট্যাবলেট ও ডেস্কটপ — সব ডিভাইসের জন্য Responsive ডিজাইন

## Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, DaisyUI
- **Authentication:** BetterAuth, MongoDB Adapter, JWT
- **Backend:** Express.js, MongoDB

## Run Locally

1. `npm install`
2. `.env.local` ফাইল বানিয়ে প্রয়োজনীয় environment variable দাও
3. `npm run dev`