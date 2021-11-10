import { useState, useEffect } from "react"
import Link from "next/link"

import { getCategories } from "services"

export const Header = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    return (
        <header className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-gray-800 py-8">
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl">
                            GraphCMS
                        </span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((category) => (
                        <Link key={category.name} href={category.slug}>
                            <span className="md:float-right mt-2 align-middle ml-4 font-thin uppercase cursor-pointer transition-opacity hover:opacity-70">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    )
}
