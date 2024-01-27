import React, {useContext} from 'react'
import { UserContext } from '../contexts/UserContext';
export default function DeleteHistoryButton({ text, userId}) {
  const {updateUser} = useContext(UserContext)
  async function handleButtonClick() {
    try {
        const response = await fetch(`https://localhost:4000/api/users/${userId}/history/`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          console.error('Failed to delete quiz history');
        } else {
          const updatedUserData = await fetch(`https://localhost:4000/api/users/${userId}`);
          const updatedUser = await updatedUserData.json();
          updateUser(updatedUser);
          console.log('Quiz history deleted successfully');
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