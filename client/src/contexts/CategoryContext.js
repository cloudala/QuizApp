import React, { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const { data, loading, error, fetchData } = useFetch(
      'https://localhost:4000/api/categories'
    );
    
    const [categories, setCategories] = useState([]);

    const updateCategories = async (newCategoryData) => {
      setCategories(newCategoryData);
    };

    useEffect(() => {
      if (!loading && !error) {
        setCategories(data);
      }
    }, [loading, error, data]);

    return (
    <CategoryContext.Provider
        value={{
        categories,
        setCategories,
        loading,
        error,
        fetchData,
        updateCategories
        }}
    >
        {children}
    </CategoryContext.Provider>
    );
};