import React, {useEffect, useState} from 'react'
import mqtt from 'mqtt';
import { toast, Bounce } from 'react-toastify';
import ToastContent from './components/ToastContent';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LogInForm'
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import CategoriesPage from './pages/CategoriesPage';
import ManageQuizPage from './pages/ManageQuizPage';
import EditQuizPage from './pages/EditQuizPage';
import LeaderBoard from './components/LeaderBoard';
import {Routes, Route} from 'react-router-dom'

export default function App() {
  const [leaderboard, setLeaderboard] = useState([]);

  const updateLeaderboard = (prevLeaderboard, userUpdate) => {
    const updatedLeaderboard = [...prevLeaderboard];
    const existingUserIndex = updatedLeaderboard.findIndex(
      (user) => user.userId === userUpdate.userId
    );

    if (existingUserIndex !== -1) {
      updatedLeaderboard[existingUserIndex].correctAnswers = userUpdate.correctAnswers;
      updatedLeaderboard[existingUserIndex].userName = userUpdate.userName;
    } else {
      updatedLeaderboard.push({
        userId: userUpdate.userId,
        userName: userUpdate.userName,
        correctAnswers: userUpdate.correctAnswers,
      });
    }

    updatedLeaderboard.sort((a, b) => b.correctAnswers - a.correctAnswers);
    return updatedLeaderboard;
  };

  useEffect(() => {
    const mqttClient = mqtt.connect('ws://localhost:8000/mqtt');

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe('leaderboard');
      mqttClient.subscribe('user-reactions');
      mqttClient.subscribe('quiz-updates');
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === 'leaderboard') {
        const userUpdate = JSON.parse(message.toString());
        setLeaderboard((prevLeaderboard) => updateLeaderboard(prevLeaderboard, userUpdate));
      }

      if (topic === 'user-reactions') {
        console.log('Received user reaction:', JSON.parse(message.toString()));
        const emojiUrl = JSON.parse(message.toString());
        toast.info(<ToastContent emojiUrl={emojiUrl}/>, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          body: <img alt="Emoji" style={{ width: '30px' }} src={emojiUrl} />,
        });
      }

      if (topic === 'quiz-updates') {
        const quizUpdate = JSON.parse(message.toString());
        toast.info(`${quizUpdate}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []);
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/register' element={<SignUpForm/>}/>
        <Route path='/categories' element={<CategoriesPage/>}/>
        <Route path='/quizzes' element={<HomePage leaderboard={leaderboard} updateLeaderboard={updateLeaderboard}/>}/>
        <Route path='/quizzes/:id' element={<QuizPage/>}/>
        <Route path='/quizzes/manage' element={<ManageQuizPage/>}/>
        <Route path='/quizzes/manage/:id' element={<EditQuizPage/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}