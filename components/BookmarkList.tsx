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

    if (!error) {
      setBookmarks(data || []);
    }
  };

  useEffect(() => {
    fetchBookmarks();

    // 🔥 manual refresh event (after add)
    const handler = () => fetchBookmarks();
    window.addEventListener("bookmark-added", handler);

    // ⚡ realtime (multi-tab)
    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        fetchBookmarks
      )
      .subscribe();

    return () => {
      window.removeEventListener("bookmark-added", handler);
      supabase.removeChannel(channel);
    };
  }, []);

  const deleteBookmark = async (id: string) => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)
      .eq("user_id", userData.user.id);

    if (!error) {
      fetchBookmarks();
    } else {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      {bookmarks.length === 0 && (
        <p className="text-gray-500">No bookmarks yet</p>
      )}

      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="flex justify-between items-center border p-3 rounded"
        >
          <a
            href={b.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {b.title}
          </a>

          <button
            onClick={() => deleteBookmark(b.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
