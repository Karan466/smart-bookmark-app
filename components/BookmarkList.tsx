"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  // 🔹 Fetch bookmarks for current user
  const fetchBookmarks = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      console.log("No user session");
      return;
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setBookmarks(data || []);
    }
  };

  useEffect(() => {
    fetchBookmarks();

    // ⚡ REALTIME SUBSCRIPTION
    const channel = supabase
      .channel("bookmarks-realtime")
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

  // 🔥 DELETE FUNCTION (FIXED)
  const deleteBookmark = async (id: string) => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("Session expired. Please login again.");
      return;
    }

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)
      .eq("user_id", userData.user.id); // 🔥 REQUIRED FOR RLS

    if (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    } else {
      fetchBookmarks();
    }
  };

  return (
    <div className="mt-6">
      {bookmarks.length === 0 && (
        <p className="text-gray-500">No bookmarks yet</p>
      )}

      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="flex justify-between items-center border p-3 mb-2 rounded-lg bg-white shadow"
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
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
