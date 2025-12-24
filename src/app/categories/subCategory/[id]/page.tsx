import React from "react";
import { CategoryType } from "@/types/category.type";



export default async function SubCategories({ categoryId }:{categoryId: string}) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
  const { data } = await res.json();

  return (
    <div className="w-[80%] mt-12 mb-6">
      <h2 className="text-3xl font-bold mb-8 text-center">SubCategories</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((category: CategoryType) => (
            <div key={category._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition text-center">
              
              <h3 className="font-semibold mt-2">{category.name}</h3>
            </div>
        ))}
      </div>
    </div>
  );
}

