"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const fetchBookmarks = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    if (!error) setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();

    // 🔥 REALTIME
    const channel = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        fetchBookmarks
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="mt-6">
      {bookmarks.length === 0 && <p>No bookmarks yet</p>}

      {bookmarks.map((b) => (
        <div key={b.id} className="flex justify-between border p-2 mb-2">
          <a href={b.url} target="_blank" rel="noreferrer">
            {b.title}
          </a>

          <button
            onClick={async () => {
              await supabase.from("bookmarks").delete().eq("id", b.id);
              fetchBookmarks();
            }}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
