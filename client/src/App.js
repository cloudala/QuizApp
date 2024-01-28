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
import {Routes, Route} from 'react-router-dom'

export default function App() {
  const [activeUsers, setActiveUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [randomFact, setRandomFact] = useState(null);

  const updateActiveUsers = (prevActiveUsers, userUpdate) => {
    const updatedActiveUsers = [...prevActiveUsers];
    if (userUpdate.logout) {
      const remainingUsers = updatedActiveUsers.filter(
        (user) => user.userId !== userUpdate.userId
      );

      return remainingUsers;
    }

    const existingUserIndex = updatedActiveUsers.findIndex(
      (user) => user.userId === userUpdate.userId
    );
  
    if (existingUserIndex !== -1) {
      if (userUpdate.nameChange) {
        updatedActiveUsers[existingUserIndex].userName = userUpdate.userName;
      } else {
        updatedActiveUsers[existingUserIndex].time = userUpdate.currentTime;
      }
    } else {
      updatedActiveUsers.push({
        userId: userUpdate.userId,
        userName: userUpdate.userName,
        time: userUpdate.currentTime?.toString(),
      });
    }
    return updatedActiveUsers;
  };

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
      mqttClient.subscribe('active-users');
      mqttClient.subscribe('user-reactions');
      mqttClient.subscribe('quiz-updates');
      mqttClient.subscribe('random-fact');
      mqttClient.publish('random-fact', JSON.stringify('ready'))
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === 'leaderboard') {
        const userUpdate = JSON.parse(message.toString());
        setLeaderboard((prevLeaderboard) => updateLeaderboard(prevLeaderboard, userUpdate));
      }

      if (topic === 'active-users') {
        const data = JSON.parse(message.toString())
        const activeUser = data.userName;
        const currentTime = data.currentTime;
        console.log(activeUser, currentTime);
        setActiveUsers((prevActiveUsers) => updateActiveUsers(prevActiveUsers, data));
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

      if (topic === 'random-fact') {
        console.log("Received random fact:", message.toString());
        const newRandomFact = JSON.parse(message.toString());
        if (newRandomFact !== 'ready') {
          console.log(newRandomFact)
          setRandomFact(newRandomFact)
        }
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
        <Route path='/quizzes' element={<HomePage leaderboard={leaderboard} updateLeaderboard={updateLeaderboard} activeUsers={activeUsers} updateActiveUsers={updateActiveUsers} randomFact={randomFact}/>}/>
        <Route path='/quizzes/:id' element={<QuizPage/>}/>
        <Route path='/quizzes/manage' element={<ManageQuizPage/>}/>
        <Route path='/quizzes/manage/:id' element={<EditQuizPage/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}