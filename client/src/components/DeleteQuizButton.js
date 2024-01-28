import React, {useContext} from 'react'
import { CategoryContext } from '../contexts/CategoryContext'
import { QuizContext } from '../contexts/QuizContext'

export default function DeleteQuizButton({ text, quizId}) {
  const {updateCategories} = useContext(CategoryContext)
  const {updateQuizzes} = useContext(QuizContext)
  async function handleButtonClick() {
    try {
        const response = await fetch(`https://localhost:4000/api/quizzes/${quizId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          console.error('Failed to quiz category');
        } else {
        //   const newCategoriesResponse = await fetch(`https://localhost:4000/api/categories`);
        //   const newCategories = await newCategoriesResponse.json()
          const newQuizzesResponse = await fetch(`https://localhost:4000/api/quizzes`);
          const newQuizzes = await newQuizzesResponse.json()
        //   updateCategories(newCategories);
          updateQuizzes(newQuizzes.quizzes)
          console.log('Quiz deleted successfully');
      }
    } catch (error) {
        console.error('Error:', error);
    }
  }
  return (
    <button
      onClick={handleButtonClick}
      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-10"
    >
      {text}
    </button>
  );
}