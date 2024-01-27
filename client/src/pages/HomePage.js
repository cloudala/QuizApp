import React, { useContext } from 'react';
import { QuizContext } from '../contexts/QuizContext';
import { UserContext } from '../contexts/UserContext';
import QuizList from '../components/QuizList'
import Loading from '../components/Loading';
import UserData from '../components/UserData';

export default function HomePage() {
    const {user, setUser} = useContext(UserContext)
    const { quizzes, loading, error, fetchData } = useContext(QuizContext);
    return (
        <>
          <UserData user={user}/>
          {loading ? (
            <Loading/>
          ) : !error ? (
            <QuizList quizzes={quizzes}/>
          ) : (
            <p>Error fetching data</p>
          )}
        </>
      );
}