"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkForm({ onAdd }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: userData.user.id,
    });

    setTitle("");
    setUrl("");
    onAdd();
  };

  return (
    <div className="space-x-2">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
      />
      <input
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2"
      />
      <button onClick={addBookmark} className="bg-green-600 text-white px-4 py-2">
        Add
      </button>
    </div>
  );
}
