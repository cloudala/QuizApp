import React from "react"

export default function EditCategoryButton({text, editCategory, setEditCategory }) {
    return (
        <button className="text-blue-800 bg-blue-100  hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-10" onClick={() => setEditCategory(!editCategory)}>{text}</button>
    )
}