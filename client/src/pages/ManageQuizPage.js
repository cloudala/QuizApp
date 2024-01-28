import React, {useContext} from 'react'
import { QuizContext } from '../contexts/QuizContext'
import QuizForm from "../components/QuizForm"
import ManageQuizList from "../components/ManageQuizList"


export default function ManageQuizPage() {
    const {quizzes} = useContext(QuizContext)
    return (
        <div className="min-h-screen">
            <div className="flex flex-col justify-center items-center">
                <h1 className='text-2xl font-semibold my-5 mx-3'>Add Quiz</h1>
                <QuizForm/>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className='text-2xl font-semibold my-5 mx-3'>Manage Quizzes</h1>
                <ManageQuizList quizzes={quizzes}/>
            </div>
        </div>
    )
}