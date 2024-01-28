import React, {useEffect} from 'react'
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
  useEffect(() => {
    const mqttClient = mqtt.connect('ws://localhost:8000/mqtt');

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe('user-reactions');
    });

    mqttClient.on('message', (topic, message) => {
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
        <Route path='/quizzes' element={<HomePage/>}/>
        <Route path='/quizzes/:id' element={<QuizPage/>}/>
        <Route path='/quizzes/manage' element={<ManageQuizPage/>}/>
        <Route path='/quizzes/manage/:id' element={<EditQuizPage/>}/>
        <Route path='/leaderboard' element={<LeaderBoard/>} />
      </Routes>
      <Footer/>
    </div>
  )
}