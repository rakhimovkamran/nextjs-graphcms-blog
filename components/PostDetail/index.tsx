import React, { FC } from "react"
import moment from "moment"

interface PostDetailProps {
    post: any
}

export const PostDetail: FC<PostDetailProps> = ({ post }) => {
    const getContentFragment = (index, text, obj, type?: any) => {
        let modifiedText = text

        if (obj) {
            if (obj.bold) {
                modifiedText = <b key={index}>{text}</b>
            }

            if (obj.italic) {
                modifiedText = <em key={index}>{text}</em>
            }

            if (obj.underline) {
                modifiedText = <u key={index}>{text}</u>
            }
        }

        switch (type) {
            case "heading-three":
                return (
                    <h3 key={index} className="text-xl font-semibold mb-4">
                        {modifiedText.map((item, i) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h3>
                )
            case "paragraph":
                return (
                    <p key={index} className="mb-8">
                        {modifiedText.map((item, i) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </p>
                )
            case "heading-four":
                return (
                    <h4 key={index} className="text-md font-semibold mb-4">
                        {modifiedText.map((item, i) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h4>
                )
            case "image":
                return (
                    <img
                        key={index}
                        alt={obj.title}
                        height={obj.height}
                        width={obj.width}
                        src={obj.src}
                    />
                )
            default:
                return modifiedText
        }
    }

    return (
        <section className="bg-black shadow-lg rounded-lg lg:p-8 pb-12 mb-8 text-white">
            <div className="relative overflow-hidden shadow-md mb-6">
                <img
                    className="object-top h-full w-full rounded-t-lg"
                    src={post.featuredImage.url}
                    alt={post.title}
                />
            </div>

            <div className="px-4 lg:px-0">
                <div className="flex items-center mb-8 w-full">
                    <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
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
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2"
                            />
                        </svg>

                        <span>
                            {moment(post.createdAt).format("MMM DD, YYYY")}
                        </span>
                    </div>
                </div>

                <h1 className="mb-8 text-3xl font-semibold text-white">
                    {post.title}
                </h1>

                {post.content.raw.children.map((typeObj, idx) => {
                    const children = typeObj.children.map((item, item_idx) =>
                        getContentFragment(item_idx, item.text, item)
                    )

                    return getContentFragment(
                        idx,
                        children,
                        typeObj,
                        typeObj.type
                    )
                })}
            </div>
        </section>
    )
}
