"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import users from "@/data/user";

export default function UserPage() {
  const router = useRouter();
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

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

  const quizQuestions = [
    { id: 1, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
    { id: 2, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { id: 3, question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" }
  ];

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
      
      <div className="mt-6 w-full max-w-md bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Quiz</h2>
        {quizQuestions.map((question) => (
          <div key={question.id} className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">{question.question}</p>
            {question.options.map((option) => (
              <label key={option} className="block text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={quizAnswers[question.id] === option}
                  onChange={() => handleOptionChange(question.id, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleSubmitQuiz}
        >
          Submit Quiz
        </button>
      </div>

      {showResult && (
        <div className="mt-6 p-4 bg-blue-200 text-blue-900 rounded-lg">
          <p className="text-xl font-bold">Your Score: {score} / {quizQuestions.length}</p>
        </div>
      )}

      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => router.push("/")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
