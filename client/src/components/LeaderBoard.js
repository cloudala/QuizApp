import React from 'react';

function LeaderBoard({ leaderboard, updateLeaderboard }) {
  return (
    leaderboard && 
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white p-2 mb-2 rounded-md shadow-sm"
          >
            <span className="text-lg">{user.userName}</span>
            <span className="text-lg font-semibold text-green-500">
              {user.correctAnswers} correct answers
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaderBoard;