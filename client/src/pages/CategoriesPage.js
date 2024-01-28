import React, { useContext } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';
import { UserContext } from '../contexts/UserContext';
import AddCategoryForm from '../components/AddCategoryForm'
import CategoryList from '../components/CategoryList';
import Loading from '../components/Loading';

export default function CategoriesPage() {
  const {user} = useContext(UserContext)
  const { categories, loading, error, fetchData } = useContext(CategoryContext);
  return (
    <div className='min-h-screen'>
      {user ? (
        <>
          {loading ? (
            <Loading />
          ) : !error ? (
            <>
              <div>
                <h1 className='text-2xl font-semibold mt-5 mx-3'>Add Category</h1>
                <AddCategoryForm />
              </div>
              <div>
                <h1 className='text-2xl font-semibold my-5 mx-3'>Manage Categories</h1>
                <CategoryList categories={categories} />
              </div>
            </>
          ) : (
            <p>Error fetching data</p>
          )}
        </>
      ) : (
        <p className="text-xl mt-5 mx-3 font-semibold">You have to be logged in to manage categories.</p>
      )}
    </div>
  );
}