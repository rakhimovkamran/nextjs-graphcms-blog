import { FC } from "react"
import moment from "moment"
import Link from "next/link"

interface PostCardProps {
    post: {
        excerpt: string
        title: string
        slug: string

        createdAt: string

        author: {
            name: string

            photo: {
                url: string
            }
        }

        featuredImage: {
            url: string
        }
    }
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
    return (
        <div className="bg-black shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md pb-80 mb-6">
                <img
                    className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
                    src={post.featuredImage.url}
                    alt={post.title}
                />
            </div>

            <h1 className="transition-colors text-center mb-8 cursor-pointer text-white hover:text-gray-500 text-3xl uppercase">
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </h1>

            <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
                <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                    <img
                        className="align-middle rounded-full"
                        alt={post.author.name}
                        height="30px"
                        width="30px"
                        src={post.author.photo.url}
                    />

                    <p className="inline align-middle text-white ml-2 text-lg">
                        {post.author.name}
                    </p>
                </div>

                <div className="font-medium text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline mr-2 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>

                    <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
                </div>
            </div>

            <p className="text-center text-gray-200 font-thin text-lg px-4 lg:px-20 mb-8">
                {post.excerpt}
            </p>

            <div className="text-center">
                <Link href={`/post/${post.slug}`}>
                    <span className="transition-all transform hover:-translate-y-1 inline-block bg-green-500 px-5 py-3 rounded-full hover:bg-green-400 hover:shadow-md cursor-pointer">
                        Continue Reading
                    </span>
                </Link>
            </div>
        </div>
    )
}
