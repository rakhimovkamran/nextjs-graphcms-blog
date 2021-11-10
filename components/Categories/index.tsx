import { useState, useEffect } from "react"
import Link from "next/link"

import { getCategories } from "services"

export const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    return (
        <div className="bg-black shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-white text-lg font-thin mb-8 border-b border-gray-800 pb-3">
                Categories
            </h3>

            {categories.map((category) => (
                <div
                    className="w-full flex items-center mb-5 last:mb-0"
                    key={category.slug}
                >
                    <div className="flex-grow">
                        <Link href={`/category/${category.slug}`}>
                            <span className="text-md transition-opacity hover:opacity-60 cursor-pointer text-white">
                                {category.name}
                            </span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
