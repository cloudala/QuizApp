import { useParams } from "react-router-dom"
import UpdateQuizForm from "../components/UpdateQuizForm"

export default function EditQuizPage() {
    const { id } = useParams()
    console.log(id)
    return (
        <div className=" min-h-screen flex flex-col justify-center items-center">
            <h1 className='text-2xl font-semibold my-5 mx-3'>Edit Quiz</h1>
            <UpdateQuizForm quizId={id}/>
        </div>
    )
}