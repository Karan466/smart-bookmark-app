"use client";

import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-8">
      
      {/* Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Bookmarks
          </h1>

          <span className="text-sm text-gray-500">
            Real-time sync enabled ⚡
          </span>
        </div>

        {/* Add Bookmark Card */}
        <div className="bg-gray-50 p-6 rounded-xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Add New Bookmark
          </h2>

          <BookmarkForm onAdd={() => {}} />
        </div>

        {/* Bookmark List */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Your Saved Links
          </h2>

          <BookmarkList />
        </div>
      </div>
    </div>
  );
}
