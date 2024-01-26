import React from 'react'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LogInForm'
import LeaderBoard from './components/LeaderBoard';
import {Routes, Route} from 'react-router-dom'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>}/>
        <Route path='/register' element={<SignUpForm/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/leaderboard' element={<LeaderBoard />} />
      </Routes>
    </>
  )
}