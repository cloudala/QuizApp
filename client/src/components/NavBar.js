import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-semibold">QuizIzz</Link>
        <div className="flex items-center space-x-4">
          <Link to="/categories" className="text-white">Categories</Link>
          <Link to="/register" className="text-white">Register</Link>
          <Link to="/" className="text-white">Login</Link>
          <Link to="/leaderboard" className="text-white">Leaderboard</Link>
          <Link to="/reactions" className="text-white">Reactions</Link>
          <Link to="/reactions-notif" className="text-white">Notifications</Link>
        </div>
      </div>
    </nav>
  );
};