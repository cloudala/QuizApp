import React, {useContext} from 'react'
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom'
import mqtt from 'mqtt';

export default function DeleteUserButton({ text, userId}) {
  const navigate = useNavigate()
  const {user, updateUser} = useContext(UserContext)
  async function handleButtonClick() {
    try {
        const response = await fetch(`https://localhost:4000/api/users/${userId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          console.error('Failed to delete account');
        } else {
          updateUser(null);
          const mqttClient = mqtt.connect('ws://localhost:8000/mqtt');
          mqttClient.publish('active-users', JSON.stringify({ logout: true, userId: user.id }));
          console.log('User deleted successfully');
          navigate('/register')
      }
    } catch (error) {
        console.error('Error:', error);
    }
  }
  return (
    <button
      onClick={handleButtonClick}
      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-10"
    >
      {text}
    </button>
  );
}