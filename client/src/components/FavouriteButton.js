import React, {useContext} from 'react'
import { UserContext } from '../contexts/UserContext';
export default function FavouriteQuizButton({ text, userId, quizId }) {
    const {updateUser} = useContext(UserContext)
    async function handleButtonClick() {
        try {
          const response = await fetch(`https://localhost:4000/api/users/${userId}/favourite/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({favourite: `${quizId}` }),
          });
    
          if (!response.ok) {
            console.error('Failed to update favorite status');
          } else {
            const updatedUserData = await fetch(`https://localhost:4000/api/users/${userId}`);
            const updatedUser = await updatedUserData.json();
            updateUser(updatedUser);
            console.log('Quiz favorite status updated successfully');
          }
        } catch (error) {
          console.error('Error:', error);
        }
    }

    return (
      <button onClick={handleButtonClick} className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        {text}
      </button>
    );
}