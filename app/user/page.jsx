"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import users from "@/data/user";
import quizQuestions from "@/data/quiz";

export default function UserPage() {
  const router = useRouter();
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => setLocation(null),
        { enableHighAccuracy: true }
      );
    }
  }, []);

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

  const handleOptionChange = (questionId, selectedOption) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    quizQuestions.forEach((question) => {
      if (quizAnswers[question.id] === question.answer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setShowResult(true);
  };

  const [selectedUser, setSelectedUser] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Select User</h1>
      {location ? (
        <div className="mb-4 w-full max-w-md h-64">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p className="mb-4 text-gray-700 dark:text-gray-300">Fetching location...</p>
      )}
      
      <select
        className="p-2 border rounded"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select a User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      
      <div className="mt-4">
        <input
          type="checkbox"
          id="confirm"
          checked={checkboxChecked}
          onChange={(e) => setCheckboxChecked(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="confirm" className="text-gray-700 dark:text-gray-300">Confirm Selection</label>
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        disabled={!selectedUser || !checkboxChecked}
        onClick={() => router.push(`/test/${selectedUser}`)}
      >
        Proceed to Test
      </button>
    </div>
  );
}