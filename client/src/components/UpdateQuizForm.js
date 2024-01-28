import React, { useState, useEffect, useContext } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';
import { QuizContext } from '../contexts/QuizContext';
import { useFormik } from 'formik';

const UpdateQuizForm = ({ quizId }) => {
  const { categories: initialCategories } = useContext(CategoryContext);
  const { updateQuizzes } = useContext(QuizContext);
  const [categories, setCategories] = useState(initialCategories);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`https://localhost:4000/api/quizzes/${quizId}`);
        if (!response.ok) {
          console.error('Failed to fetch quiz');
          return null;
        }
        const quizData = await response.json();
        console.log('Fetched Quiz Data:', quizData);
        return quizData;
      } catch (error) {
        console.error('Error fetching quiz:', error);
        return null;
      }
    };

    const loadQuizData = async () => {
      const data = await fetchQuiz();
      if (data) {
        console.log(data.quiz)
        setQuizData(data.quiz);
      }
    };

    loadQuizData();
  }, [quizId]);

  const formik = useFormik({
    initialValues: {
      title: '',
      categoryId: '',
      questions: [{ text: '', options: ['', '', ''], correctOption: 0 }],
    },
    onSubmit: async (values, { resetForm }) => {
      console.log('Form submitted:', values);
      try {
        const response = await fetch(`https://localhost:4000/api/quizzes/${quizId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: values.title,
            category: values.categoryId,
            questions: values.questions,
          }),
        });

        if (!response.ok) {
          console.error('Failed to update quiz');
        } else {
          const updatedQuizzesResponse = await fetch(`https://localhost:4000/api/quizzes`);
          const updatedQuizzes = await updatedQuizzesResponse.json();
          updateQuizzes(updatedQuizzes.quizzes);
          console.log('Quiz updated successfully');
        }
        resetForm();
      } catch (error) {
        console.error('Error updating quiz:', error);
      }
    },
  });

  useEffect(() => {
    if (quizData) {
      formik.setValues({
        title: quizData.title || '',
        categoryId: quizData.categoryId || '',
        questions: Array.isArray(quizData.questions)
          ? quizData.questions
          : [{ text: '', options: ['', '', ''], correctOption: 0 }],
      });
    }
  }, [quizData]);

  const handleAddQuestion = () => {
    formik.setValues({
      ...formik.values,
      questions: [
        ...formik.values.questions,
        { text: '', options: ['', '', ''], correctOption: 0 },
      ],
    });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...formik.values.questions];
    updatedQuestions.splice(index, 1);

    formik.setValues({
      ...formik.values,
      questions: updatedQuestions,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={formik.handleSubmit}>
        <label className="block mb-2 text-lg font-bold">Title:</label>
        <input
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          name="title"
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        <label className="block mb-2 text-lg font-bold">Category:</label>
        <select
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          name="categoryId"
          className="w-full px-4 py-2 mb-4 border rounded-md"
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {formik.values.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <label className="block mb-2 text-lg font-bold">Question Text:</label>
            <input
              type="text"
              value={question.text}
              onChange={(e) =>
                formik.handleChange({
                  target: {
                    name: `questions[${index}].text`,
                    value: e.target.value,
                  },
                })
              }
              name={`questions[${index}].text`}
              className="w-full px-4 py-2 mb-2 border rounded-md"
            />

            <label className="block mb-2 text-lg font-bold">Options:</label>
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                value={option}
                onChange={(e) =>
                  formik.handleChange({
                    target: {
                      name: `questions[${index}].options[${optionIndex}]`,
                      value: e.target.value,
                    },
                  })
                }
                name={`questions[${index}].options[${optionIndex}]`}
                className="w-full px-4 py-2 mb-2 border rounded-md"
              />
            ))}

            <label className="block mb-2 text-lg font-bold">Correct Option:</label>
            <select
              value={question.correctOption}
              onChange={(e) =>
                formik.handleChange({
                  target: {
                    name: `questions[${index}].correctOption`,
                    value: parseInt(e.target.value),
                  },
                })
              }
              name={`questions[${index}].correctOption`}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            >
              {question.options.map((_, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  Option {optionIndex + 1}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => handleRemoveQuestion(index)}
             className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-10"
            >
              Remove Question
            </button>
          </div>
        ))}

        <div className="flex gap-3 items-center justify-between">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add Question
          </button>

          <button
            type="submit"
            className="bg-green-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Update Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateQuizForm;