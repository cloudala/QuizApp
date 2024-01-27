import React from "react";
import QuizCard from "./QuizCard";

export default function QuizList({ quizzes }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2">
        {quizzes.map((quiz, id) => (
          <QuizCard key={id} quiz={quiz} />
        ))}
      </div>
    );
  }