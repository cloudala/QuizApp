import React from 'react';
import { useFormik } from 'formik';

const QuizForm = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      questions: [{ text: '', options: ['', '', ''], correctOption: 0 }],
    },
    onSubmit: async (values) => {
      console.log('Form submitted:', values);
    },
  });

  const handleAddQuestion = () => {
    formik.setValues({
      ...formik.values,
      questions: [
        ...formik.values.questions,
        { text: '', options: ['', '', ''], correctOption: 0 },
      ],
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

        {formik.values.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <label className="block mb-2 text-lg font-bold">
              Question {index + 1}:
            </label>
            <input
              type="text"
              value={question.text}
              onChange={(e) =>
                formik.handleChange({
                  target: { name: `questions[${index}].text`, value: e.target.value },
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

            <label className="block mb-2 text-lg font-bold">
              Correct Option:
            </label>
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
          </div>
        ))}
        <div className='flex gap-3'>
            <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
            Add Question
            </button>

            <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
            >
            Submit Quiz
            </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;