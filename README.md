📘 Smart Bookmark App

A full-stack, real-time bookmark manager that allows users to securely save and manage personal bookmarks using Google authentication.

Built with Next.js (App Router), Supabase (Auth, Database, Realtime), and Tailwind CSS, the application ensures each user can access only their own bookmarks, with instant synchronization across multiple tabs.

🌐 Live Demo

👉 https://smart-bookmark-app-zeta.vercel.app

✨ Features

🔐 Google OAuth authentication (Supabase Auth)

➕ Add personal bookmarks (URL + title)

🔒 Private per-user data using Row Level Security (RLS)

⚡ Real-time updates across tabs (Supabase Realtime)

❌ Delete bookmarks

🌐 Deployed on Vercel

🛠️ Tech Stack

Next.js (App Router)

Supabase (Auth, PostgreSQL, Realtime)

Tailwind CSS

TypeScript

Vercel (Deployment)

⚙️ Local Setup
1️⃣ Clone the repository
git clone <your-repo-url>
cd smart-bookmark-app

2️⃣ Install dependencies
npm install

3️⃣ Add environment variables

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4️⃣ Run locally
npm run dev


Open 👉 http://localhost:3000

🧠 Challenges Faced & Solutions
🔹 OAuth Redirect Issues in Production

Problem: Google login worked locally but failed after deployment.
Solution: Correctly configured Supabase Site URL and Redirect URLs and used a dynamic redirect:

redirectTo: `${window.location.origin}/auth/callback`

🔹 Double Authentication Issue

Problem: Users had to sign in twice due to session hydration timing issues.
Solution: Implemented proper OAuth callback handling using exchangeCodeForSession and session-based auth checks.

🔹 Row Level Security Blocking Inserts

Problem: Bookmarks were not saving due to missing RLS policies.
Solution: Added SELECT, INSERT, and DELETE policies scoped to auth.uid().

🔹 Real-Time Synchronization

Problem: Bookmark updates did not appear instantly across tabs.
Solution: Enabled Supabase Realtime and implemented client-side subscriptions with state refresh.

📈 Future Improvements

Bookmark tags & search

Folder-based organization

Dark mode

Bookmark previews

AI-based bookmark categorization

👨‍💻 Author

Karan Kumar