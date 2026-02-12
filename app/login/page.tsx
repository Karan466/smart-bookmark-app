"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        
        {/* App Title */}
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Smart Bookmark App
        </h1>

        <p className="text-gray-500 mb-8">
          Save and manage your bookmarks securely
        </p>

        {/* Google Button */}
        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path
              fill="#fff"
              d="M44.5 20H24v8.5h11.8C34.7 33.9 30 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.2 0 6.1 1.2 8.4 3.2l6-6C34.7 4.7 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.5-4z"
            />
          </svg>

          Sign in with Google
        </button>

        <p className="text-xs text-gray-400 mt-6">
          Secure login powered by Google OAuth
        </p>
      </div>
    </div>
  );
}
