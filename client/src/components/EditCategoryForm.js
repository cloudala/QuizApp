import React, {useContext} from 'react';
import { CategoryContext } from '../contexts/CategoryContext';
import { QuizContext } from '../contexts/QuizContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddCategoryForm({category}) {
  const {updateCategories} = useContext(CategoryContext)
  const {updateQuizzes} = useContext(QuizContext)
  const initialValues = {
    name: category.name,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter the category name'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(`https://localhost:4000/api/categories/${category.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.error('Failed to update category');
      } else {
        const newCategoriesResponse = await fetch(`https://localhost:4000/api/categories`);
        const newCategories = await newCategoriesResponse.json()
        const newQuizzesResponse = await fetch(`https://localhost:4000/api/quizzes`);
        const newQuizzes = await newQuizzesResponse.json()
        updateCategories(newCategories)
        updateQuizzes(newQuizzes.quizzes)
        console.log(`Category updated successfully`);
      }
      resetForm();
    } catch(error) {
      console.error("Error updating category:", error);
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
        <div className='flex justify-between gap-2'>
          <button
            type='button'
            onClick={formik.handleReset}
            className='w-36 text-blue-800 bg-blue-100  hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Reset
          </button>
          <button
            type='submit'
            className='w-fit text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
}