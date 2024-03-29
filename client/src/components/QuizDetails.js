import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import EmojiPicker from "./EmojiReactionPicker";

const QuizDetails = ({ quiz, userId, updateUser }) => {
  const {user} = useContext(UserContext)
  const [quizResult, setQuizResult] = useState(null)
  const initialValues = quiz.questions.reduce((acc, question) => {
    acc[question.id] = "";
    return acc;
  }, {});

  const validationSchema = Yup.object().shape(
    quiz.questions.reduce((acc, question) => {
      acc[question.id] = Yup.string().required("Please select an option");
      return acc;
    }, {})
  );

  const onSubmit = async (values, {resetForm}) => {
    const answers = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, parseInt(value)])
    );
    const answersArray = Object.values(answers);
    console.log(answersArray);
    try {
      const response = await fetch(`https://localhost:4000/api/quizzes/${quiz.id}/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: `${userId}`, answers: answersArray }),
      });

      if (!response.ok) {
        console.error('Failed to submit quiz');
      } else {
        const quizFeedback = await response.json()
        const updatedUserData = await fetch(`https://localhost:4000/api/users/${userId}`);
        const updatedUser = await updatedUserData.json();
        updateUser(updatedUser);
        setQuizResult(quizFeedback.score)
        console.log(`Quiz updated successfully, your score: ${quizFeedback.score}`);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <EmojiPicker user={user} quizTitle={quiz.title}/>
      <h1 className="text-2xl font-semibold mb-4">Welcome to {quiz.title}</h1>
      <form onSubmit={formik.handleSubmit}>
        {quiz.questions.map((question) => (
          <div key={question.id} className="mb-4">
            <p className="font-semibold mb-2">{question.text}</p>
            {question.options.map((option, index) => (
              <div key={option} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`${question.id}-${index}`}
                  name={question.id}
                  value={index}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values[question.id] === index.toString()}
                  className="mr-2"
                />
                <label htmlFor={`${question.id}-${index}`}>{option}</label>
              </div>
            ))}
            {formik.touched[question.id] && formik.errors[question.id] && (
              <div className="text-red-500">{formik.errors[question.id]}</div>
            )}
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="text-blue-800 bg-blue-100 hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-10 w-24"
          >
            Reset
          </button>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit Answers
          </button>
        </div>
      </form>
      <h1 className="font-semibold text-2xl my-3">Your score: {quizResult} / {quiz.questions.length}</h1>
    </div>
  );
};

export default QuizDetails;