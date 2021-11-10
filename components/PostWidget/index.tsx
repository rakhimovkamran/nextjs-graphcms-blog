import { useState, useEffect, FC } from "react"
import Link from "next/link"
import moment from "moment"

import { getRecentPosts, getSimilarPosts } from "services"

interface PostWidgetProps {
    slug?: string
    categories?: string[]
}

export const PostWidget: FC<PostWidgetProps> = ({ categories, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {
        if (slug) {
            getSimilarPosts(slug, categories).then(setRelatedPosts)
        } else {
            getRecentPosts().then(setRelatedPosts)
        }
    }, [categories, slug])

    return (
        <div className="bg-black shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-white text-lg font-thin mb-8 border-b border-gray-800 pb-3">
                {slug ? "Related Posts" : "Recent Posts"}
            </h3>

            {relatedPosts.map((post) => (
                <div
                    className="w-full flex items-center mb-5 last:mb-0"
                    key={post.slug}
                >
                    <div className="flex items-center justify-center flex-none">
                        <img
                            className="align-middle rounded-full border w-14 h-14 object-cover"
                            src={post.featuredImage.url}
                            alt={post.title}
                        />
                    </div>

                    <div className="flex-grow ml-4">
                        <Link href={`/post/${post.slug}`}>
                            <span className="text-md transition-opacity hover:opacity-60 cursor-pointer text-white">
                                {post.title}
                            </span>
                        </Link>

                        <p className="text-green-500 font-this text-xs">
                            {moment(post.createdAt).format("MMM DD, YYYY")}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
