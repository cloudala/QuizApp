import React, { useContext } from 'react';
import { QuizContext } from '../contexts/QuizContext';
import { UserContext } from '../contexts/UserContext';
import QuizSearch from '../components/QuizSearch';
import QuizList from '../components/QuizList'
import Loading from '../components/Loading';
import UserData from '../components/UserData';
import ActiveUsers from '../components/ActiveUsers';
import LeaderBoard from '../components/LeaderBoard';
import RandomFact from '../components/RandomFact'
import VisitCount from '../components/VisitCountComponent';

export default function HomePage({leaderboard, updateLeaderboard, activeUsers, updateActiveUsers, randomFact}) {
    const {user, setUser} = useContext(UserContext)
    const { quizzes, loading, error, fetchData } = useContext(QuizContext);
    return (
        <div className='min-h-screen'>
          <VisitCount/>
          {randomFact && <RandomFact fact={randomFact}/>}
          <ActiveUsers activeUsers={activeUsers} updateActiveUsers={updateActiveUsers}/>
          <LeaderBoard leaderboard={leaderboard} updateLeaderboard={updateLeaderboard}/>
          <UserData user={user}/>
          {loading ? (
            <Loading/>
          ) : !error ? (
            <>
            <div>
              <h1 className='text-2xl font-semibold my-2 mx-3'>Search Quizzes</h1>
            <QuizSearch/>
            </div>
            <div>
              <h1 className='text-2xl font-semibold my-5 mx-3'>All Quizzes</h1>
              <QuizList quizzes={quizzes}/>
            </div>
            </>
          ) : (
            <p>Error fetching data</p>
          )}
        </div>
      );
}