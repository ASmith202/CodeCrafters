import { useState } from "react";
import Navbar from "@/components/Layout/Navbar";
import Profile from "@/components/Layout/Profile";

export default function ProfilePage() {
  const [username] = useState("testuser"); // Replace with dynamic username from authentication

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <Profile username={username} />
      </div>
    </div>
  );
}