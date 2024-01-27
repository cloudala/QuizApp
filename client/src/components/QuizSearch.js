import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import QuizList from './QuizList';

const QuizSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundQuizzes, setFoundQuizzes] = useState(null)
  const { data: searchResults, loading, error} = useFetch('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://localhost:4000/api/quizzes/search/${searchQuery}`);
      const matchingQuizzes = await response.json()
      setFoundQuizzes(matchingQuizzes.quizzes)
      console.log(matchingQuizzes)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="mx-auto p-4 bg-white rounded-md shadow-md">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search for quizzes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}

      {foundQuizzes && (
        <QuizList quizzes={foundQuizzes}/>
      )}
    </div>
  );
};

export default QuizSearch;