import React, { useContext } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';
// import QuizSearch from '../components/QuizSearch';
import AddCategoryForm from '../components/AddCategoryForm'
import CategoryList from '../components/CategoryList';
import Loading from '../components/Loading';
// import UserData from '../components/UserData';

export default function CategoriesPage() {
    const { categories, loading, error, fetchData } = useContext(CategoryContext);
    return (
        <div className='min-h-screen'>
          {loading ? (
            <Loading/>
          ) : !error ? (
            <>
            <div>
              <h1 className='text-2xl font-semibold my-5 mx-3'>Add Category</h1>
              <AddCategoryForm/>
            </div>
            <div>
              <h1 className='text-2xl font-semibold my-5 mx-3'>Manage Categories</h1>
              <CategoryList categories={categories}/>
            </div>
            </>
          ) : (
            <p>Error fetching data</p>
          )}
        </div>
      );
}