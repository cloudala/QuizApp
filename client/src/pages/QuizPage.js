import React, {useContext} from 'react';
import {UserContext} from '../contexts/UserContext'
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import QuizDetails from '../components/QuizDetails';
import Loading from '../components/Loading';

export default function QuizPage() {
  const {user, updateUser} = useContext(UserContext) 
  const { id } = useParams()
  const { data, loading, error, fetchData } = useFetch(
    `https://localhost:4000/api/quizzes/${id}`
  );

  return (
    <>
      {loading ? (
        <Loading/>
      ) : !error && user ? (
        <QuizDetails quiz={data.quiz} userId={user.id} updateUser={updateUser}/>
      ) : (
        <p>Error fetching data</p>
      )}
    </>
  );
}