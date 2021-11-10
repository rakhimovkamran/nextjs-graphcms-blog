import { FC, useState, useEffect } from "react"
import parse from "html-react-parser"
import moment from "moment"

import { getComments } from "services"

interface CommentsProps {
    slug: string
}

export const Comments: FC<CommentsProps> = ({ slug }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments(slug).then(setComments)
    }, [slug])

    return (
        <section className="text-white">
            {comments.length > 0 && (
                <div className="bg-black shadow-lg rounded-lg p-8 pb-12 mb-8">
                    <h3 className="text-white text-lg font-thin mb-8 border-b border-gray-800 pb-3">
                        {comments.length} Comments
                    </h3>

                    {comments.map((comment) => (
                        <div
                            className="border-b border-gray-800 mb-4 pb-4 last:mb-0"
                            key={comment.createdAt}
                        >
                            <p className="mb-4">
                                <span className="font-semibold">
                                    {comment.name}
                                </span>{" "}
                                on{" "}
                                {moment(comment.createdAt).format(
                                    "MMM DD, YYYY"
                                )}
                            </p>

                            <p className="whitespace-pre-line text-white w-full">
                                {parse(comment.comment)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
