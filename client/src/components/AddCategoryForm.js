import React, {useContext} from 'react';
import { CategoryContext } from '../contexts/CategoryContext';
import { QuizContext } from '../contexts/QuizContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddCategoryForm() {
  const {updateCategories} = useContext(CategoryContext)
  const {updateQuizzes} = useContext(QuizContext)
  const initialValues = {
    name: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter the category name'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch('https://localhost:4000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.error('Failed to add category');
      } else {
        const newCategoriesResponse = await fetch(`https://localhost:4000/api/categories`);
        const newCategories = await newCategoriesResponse.json()
        const newQuizzesResponse = await fetch(`https://localhost:4000/api/quizzes`);
        const newQuizzes = await newQuizzesResponse.json()
        updateCategories(newCategories)
        updateQuizzes(newQuizzes.quizzes)
        console.log(`Category added successfully`);
      }
      resetForm();
    } catch(error) {
      console.error("Error adding category:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Category Name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="mt-1 p-2 border rounded-md w-full"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}