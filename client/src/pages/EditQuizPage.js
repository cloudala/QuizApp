import { useParams } from "react-router-dom"
import UpdateQuizForm from "../components/UpdateQuizForm"

export default function EditQuizPage() {
    const { id } = useParams()
    console.log(id)
    return (
        <div className="min-h-screen">
        <h1>Edit Quiz Page</h1>
        <UpdateQuizForm quizId={id}/>
        </div>
    )
}