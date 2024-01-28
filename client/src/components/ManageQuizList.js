import React from "react";
import ManageQuizCard from "./ManageQuizCard";

export default function ManageQuizList({ quizzes }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2">
        {quizzes.map((quiz, id) => (
          <ManageQuizCard key={id} quiz={quiz} />
        ))}
      </div>
    );
}