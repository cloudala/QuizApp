import React, { useState } from 'react'
import EditCategoryForm from './EditCategoryForm'
import EditCategoryButton from './EditCategoryButton'
import DeleteCategoryButton from './DeleteCategoryButton'

export default function CategoryCard({category}) {
    const [editCategory, setEditCategory] = useState(false)
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4 text-blue-700">{category.name}</h1>
            <div className='flex gap-3'>
                <EditCategoryButton text="Edit Category" editCategory={editCategory} setEditCategory={setEditCategory}/>
                <DeleteCategoryButton text="Delete Category" categoryId={category.id}/>
            </div>
            {editCategory && <EditCategoryForm category={category}/>}
        </div>
    )
}