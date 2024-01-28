import React, {useContext} from 'react'
import EditQuizButton from './EditQuizButton'
import DeleteQuizButton from './DeleteQuizButton'
import SolveQuizButton from "./SolveQuizButton"
import FavouriteQuizButton from "./FavouriteButton"
import {UserContext} from '../contexts/UserContext'
import {Link} from 'react-router-dom'

export default function ManageQuizCard({quiz}) {
    const {user} = useContext(UserContext)
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4 text-blue-700">{quiz.title}</h1>
            <p className="text-black mb-2"><span className="font-semibold">Category: </span>{quiz.categoryName}</p>
            <p className="text-black mb-3">{quiz.questions} Questions</p>
            <div className="flex gap-3">
                {user ? <DeleteQuizButton text='Delete Quiz' quizId={quiz.id}/> : <p>You have to be logged in to manage quizzes</p>}
                {user && <Link to={`/quizzes/manage/${quiz.id}`}><EditQuizButton text='Edit Quiz'/></Link>}
            </div>
        </div>
    )
}