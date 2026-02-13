"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkForm({ onAdd }: { onAdd: () => void }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const addBookmark = async () => {
    if (!title || !url) return;

    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: userData.user.id,
      },
    ]);

    setLoading(false);

    if (!error) {
      setTitle("");
      setUrl("");
      onAdd(); // 🔥 force refresh in list
    } else {
      console.error("Insert error:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 rounded w-1/3"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="border p-2 rounded w-1/2"
      />
      <button
        onClick={addBookmark}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 rounded disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}
