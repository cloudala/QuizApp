import React from 'react'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LogInForm'
import HomePage from './pages/HomePage';
import ReactionPage from './pages/ReactionPage';
import UserReactionNotification from './components/UserReactionNotification';
import LeaderBoard from './components/LeaderBoard';
import {Routes, Route} from 'react-router-dom'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<SignUpForm/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/leaderboard' element={<LeaderBoard/>} />
        <Route path='/reactions' element={<ReactionPage/>} />
        <Route path='/reactions-notif' element={<UserReactionNotification/>} />
      </Routes>
    </>
  )
}