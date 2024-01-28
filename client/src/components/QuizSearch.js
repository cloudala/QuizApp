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

  const handleHideQuizzes = () => {
    setFoundQuizzes(null);
    setSearchQuery('');
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-5 py-2.5 text-center"
        >
          Search
        </button>
        {foundQuizzes && (
          <button
            onClick={handleHideQuizzes}
            className="text-blue-800 bg-blue-100 hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-10 ml-3"
          >
            Hide
          </button>
        )}
      </div>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}

      {foundQuizzes && (
        <QuizList quizzes={foundQuizzes}/>
      )}
    </div>
  );
};

export default QuizSearch;