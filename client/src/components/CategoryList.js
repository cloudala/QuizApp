import React from "react";
import CategoryCard from "./CategoryCard";

export default function CategoryList({ categories }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2">
        {categories.map((category, id) => (
          <CategoryCard key={id} category={category}/>
        ))}
      </div>
    );
  }