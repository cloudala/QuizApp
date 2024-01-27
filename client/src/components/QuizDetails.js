import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const QuizDetails = ({ quiz, userId, updateUser }) => {
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

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <h1 className="font-semibold text-2xl my-3">Your score: {quizResult} / {quiz.questions.length}</h1>
    </div>
  );
};

export default QuizDetails;