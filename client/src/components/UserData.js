import React, { useState, useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";
import UpdateUserForm from "./UpdateUserForm";
import UpdateUserButton from "./UpdateUserButton";
import DeleteUserButton from "./DeleteUserButton";
import DeleteHistoryButton from "./DeleteHistoryButton";

export default function UserData({ user }) {
  const [editUser, setEditUser] = useState(false)
  const { quizzes } = useContext(QuizContext);
  const favouriteQuiz =
  user && quizzes && user.favourite
    ? quizzes.find((quiz) => quiz.id === user.favourite)
    : null;
  const favouriteQuizTitle = favouriteQuiz && favouriteQuiz.title ? favouriteQuiz.title : "Unknown Quiz";

  return user ? (
    <div className="w-full my-8 p-4 bg-white rounded-md shadow-md">
      <div className="flex gap-2">
        <h1 className="text-3xl font-semibold mb-4">Your User Dashboard</h1>
        <UpdateUserButton text="Update Account" editUser={editUser} setEditUser={setEditUser}/>
        <DeleteUserButton text="Delete Account" userId={user.id}/>
      </div>
      {editUser &&  <UpdateUserForm user={user}/>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-semibold">Name:</p>
          <p className="text-gray-800">{user.name}</p>
        </div>
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
           {user.history.map((attempt, id) => {
            const quiz = quizzes.find((quiz) => quiz.id === attempt.id);
            return (
              <li key={id} className="mb-2">
                {quiz ? (
                  <>
                    {quiz.title} - Result: {attempt.result}, Timestamp: {attempt.timestamp}
                  </>
                ) : (
                  <>Unknown Quiz - Result: {attempt.result}, Timestamp: {attempt.timestamp}</>
                )}
              </li>
            );
          })}
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