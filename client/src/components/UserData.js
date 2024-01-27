import React, { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";
import DeleteHistoryButton from "./DeleteHistoryButton";

export default function UserData({ user }) {
  const { quizzes } = useContext(QuizContext);
  const favouriteQuizTitle =
    user && quizzes && user.favourite
      ? quizzes.find((quiz) => quiz.id === user.favourite)?.title || "Unknown Quiz"
      : null;

  return user ? (
    <div className="w-full my-8 p-4 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-4">Your User Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-semibold">Email:</p>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Password:</p>
          <p className="text-gray-800 whitespace-pre-wrap">{user.password}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Correct Answers:</p>
          <p className="text-gray-800">{user.correctAnswers}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Favorite:</p>
          <p className="text-gray-800">{favouriteQuizTitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
      <h2 className="text-xl font-semibold my-6">Quiz History</h2>
      {user.history && user.history.length > 0 &&  <DeleteHistoryButton text="Delete Quiz History" userId={user.id}/>}
      </div>
      {user.history && user.history.length > 0 ? (
        <ul className="list-disc pl-6">
          {user.history.map((attempt, id) => (
            <li key={id} className="mb-2">
              {attempt.id} - Result: {attempt.result}, Timestamp: {attempt.timestamp}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-800">No quiz history available.</p>
      )}
    </div>
  ) : (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <p className="text-xl font-semibold mb-4">Please log in to view your user data.</p>
    </div>
  );
}