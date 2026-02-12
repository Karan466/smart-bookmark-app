"use client";

import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>

      <BookmarkForm onAdd={() => {}} />

      <BookmarkList />
    </div>
  );
}
