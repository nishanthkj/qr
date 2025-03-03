"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import users from "@/data/user";

export default function UserPage() {
  const router = useRouter();
  const params = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      if (resolvedParams?.id) {
        const user = users.find((user) => user.id === parseInt(resolvedParams.id));
        setUserData(user || null);
      }
    }
    
    fetchParams();
  }, [params]);

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User not found...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">User Details</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-gray-700 dark:text-gray-300"><strong>ID:</strong> {userData.id}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {userData.name}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {userData.email}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> {userData.address.street}, {userData.address.city}, {userData.address.state}, {userData.address.zip}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Preferences:</strong> Theme - {userData.preferences.theme}, Notifications - {userData.preferences.notifications ? "Enabled" : "Disabled"}</p>
      </div>
      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => router.push("/")}
        >
          Go Back
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => router.push(`/test/${userData.id}`)}
        >
          Take Test
        </button>
      </div>
    </div>
  );
}