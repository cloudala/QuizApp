import React from 'react';

function ActiveUsers({ activeUsers, updateActiveUsers }) {
  return (
    activeUsers && 
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Active Users</h2>
      <ul>
        {activeUsers.map((user, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white p-2 mb-2 rounded-md shadow-sm"
          >
            <span className="text-lg">{user.userName}</span>
            <span className="text-lg font-semibold text-blue-500">
              logged in at {user.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActiveUsers;