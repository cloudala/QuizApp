import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import LogInButton from './LogInButton';
import LogOutButton from './LogOutButton';
import SignUpButton from './RegisterButton';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const {user} = useContext(UserContext);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-semibold">QuizIzz</Link>
        <div className="flex items-center space-x-4">
          <Link to="/quizzes" className="text-white">Quizzes</Link>
          <Link to="/categories" className="text-white">Manage Categories</Link>
          <Link to="/quizzes/manage" className="text-white">Manage Quizzes</Link>
          {!user && <Link to="/register" className="text-white"><SignUpButton/></Link>}
          {user ?  <LogOutButton/> :  <Link to="/" className="text-white"><LogInButton/></Link>}
        </div>
      </div>
    </nav>
  );
};