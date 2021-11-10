import { FC } from "react"
import Image from "next/image"

interface AuthorProps {
    author: any
}

export const Author: FC<AuthorProps> = ({ author }) => {
    return (
        <section className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black shadow-md">
            <div className="absolute left-0 right-0 -top-14">
                <Image
                    className="align-middle object-cover rounded-full"
                    src={author.photo.url}
                    alt={author.name}
                    height="100px"
                    width="100px"
                    unoptimized
                />
            </div>

            <h3 className="text-white my-4 text-xl font-bold uppercase">
                {author.name}
            </h3>
            <p className="text-white text-lg">{author.bio}</p>
        </section>
    )
}
