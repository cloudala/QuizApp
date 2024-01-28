import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-semibold">QuizIzz</Link>
        <div className="flex items-center space-x-4">
          <Link to="/quizzes" className="text-white">Quizzes</Link>
          <Link to="/categories" className="text-white">Categories</Link>
          <Link to="/quizzes/manage" className="text-white">Manage Quizzes</Link>
          <Link to="/register" className="text-white">Register</Link>
          <Link to="/" className="text-white">Login</Link>
          <Link to="/leaderboard" className="text-white">Leaderboard</Link>
        </div>
      </div>
    </nav>
  );
};