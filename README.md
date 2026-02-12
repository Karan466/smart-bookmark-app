📘 Smart Bookmark App

A full-stack real-time bookmark manager that allows users to securely save and manage personal bookmarks using Google authentication.

Built with Next.js (App Router), Supabase (Auth, Database, Realtime), and Tailwind CSS, the application ensures each user can access only their own bookmarks with instant synchronization across multiple tabs.

🌐 Live Demo

👉 https://smart-bookmark-app-git-main-karan466s-projects.vercel.app

✨ Features

🔐 Google OAuth authentication (Supabase Auth)

➕ Add personal bookmarks (URL + title)

🔒 Private per-user data using Row Level Security

⚡ Real-time updates across tabs (Supabase Realtime)

❌ Delete bookmarks

🌐 Deployed on Vercel

🛠️ Tech Stack

Next.js (App Router)

Supabase (Auth, PostgreSQL, Realtime)

Tailwind CSS

TypeScript

Vercel Deployment

⚙️ Local Setup

Clone repo

Install dependencies

npm install


Add environment variables:

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key


Run locally:

npm run dev

🧠 Challenges Faced & Solutions
🔹 OAuth Redirect Issues in Production

Problem: Google login worked locally but failed on deployed site.
Solution: Updated redirect URLs in Supabase and Google Cloud and used dynamic redirect:

redirectTo: `${window.location.origin}/auth/callback`

🔹 Double Authentication Issue

Problem: Users had to sign in twice due to session not being restored.
Solution: Implemented proper OAuth callback handling and session checks.

🔹 Row Level Security Blocking Inserts

Problem: Bookmarks were not saving due to missing RLS policies.
Solution: Added SELECT, INSERT, DELETE policies for authenticated users.

🔹 Real-Time Synchronization

Problem: Updates did not appear across tabs initially.
Solution: Enabled Supabase Realtime subscriptions on bookmarks table.

📈 Future Improvements

Bookmark tags & search

Folder organization

Dark mode

Bookmark previews

AI-based bookmark categorization

👨‍💻 Author

Karan Kumar