import React from 'react'
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LogInForm'
import HomePage from './pages/HomePage';
import ReactionPage from './pages/ReactionPage';
import QuizPage from './pages/QuizPage';
import CategoriesPage from './pages/CategoriesPage';
import UserReactionNotification from './components/UserReactionNotification';
import LeaderBoard from './components/LeaderBoard';
import {Routes, Route} from 'react-router-dom'

export default function App() {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/register' element={<SignUpForm/>}/>
        <Route path='/categories' element={<CategoriesPage/>}/>
        <Route path='/quizzes' element={<HomePage/>}/>
        <Route path='/quizzes/:id' element={<QuizPage/>}/>
        <Route path='/leaderboard' element={<LeaderBoard/>} />
        <Route path='/reactions' element={<ReactionPage/>} />
        <Route path='/reactions-notif' element={<UserReactionNotification/>} />
      </Routes>
      <Footer/>
    </div>
  )
}