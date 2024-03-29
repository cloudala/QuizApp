import React, { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const { data, loading, error, fetchData } = useFetch(
      'https://localhost:4000/api/quizzes'
    );
    
    const [quizzes, setQuizzes] = useState([]);
    
    const updateQuizzes = async (newQuizData) => {
      setQuizzes(newQuizData);
    };

    useEffect(() => {
      if (!loading && !error) {
        setQuizzes(data.quizzes);
      }
    }, [loading, error, data]);

    return (
    <QuizContext.Provider
        value={{
        quizzes,
        setQuizzes,
        loading,
        error,
        fetchData,
        updateQuizzes
        }}
    >
        {children}
    </QuizContext.Provider>
    );
};