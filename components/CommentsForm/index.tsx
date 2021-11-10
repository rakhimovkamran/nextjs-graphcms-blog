import { FC, useState, useEffect, useRef } from "react"
import { submitComment } from "services"

interface CommentsFormProps {
    slug: string
}

export const CommentsForm: FC<CommentsFormProps> = ({ slug }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [localStorage, setLocalStorage] = useState(null)
    const [error, setError] = useState(false)

    const commentEl = useRef<HTMLTextAreaElement>()
    const storeDataEl = useRef<HTMLInputElement>()
    const emailEl = useRef<HTMLInputElement>()
    const nameEl = useRef<HTMLInputElement>()

    useEffect(() => {
        emailEl.current.value = window.localStorage.getItem("email")
        nameEl.current.value = window.localStorage.getItem("name")
    }, [])

    const handleCommentSubmission = () => {
        setError(false)

        const { checked: storeData } = storeDataEl.current
        const { value: comment } = commentEl.current
        const { value: email } = emailEl.current
        const { value: name } = nameEl.current

        if (!comment || !name || !email) {
            setError(true)
            return
        }

        const commentObj = {
            name,
            email,
            comment,
            slug,
        }

        if (storeData) {
            window.localStorage.setItem("email", email)
            window.localStorage.setItem("name", name)
        } else {
            window.localStorage.removeItem("name")
            window.localStorage.removeItem("email")
        }

        submitComment(commentObj).then(() => {
            setShowSuccessMessage(true)

            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        })
    }

    return (
        <section className="bg-black shadow-lg rounded-lg p-8 pb-12 mb-8 text-white">
            <h3 className="text-white text-lg font-thin mb-8 border-b border-gray-800 pb-3">
                Leave a Reply
            </h3>

            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea
                    className="p-4 outline-none bg-gray-600 transition-all bg-opacity-30 w-full rounded-lg focus:ring-1 focus:ring-green-400"
                    placeholder="Write your comment..."
                    ref={commentEl}
                    name="comment"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
                <input
                    className="py-3 px-4 outline-none bg-gray-600 transition-all bg-opacity-30 w-full rounded-lg focus:ring-1 focus:ring-green-400"
                    placeholder="Name"
                    ref={nameEl}
                    name="name"
                />

                <input
                    className="py-3 px-4 outline-none bg-gray-600 transition-all bg-opacity-30 w-full rounded-lg focus:ring-1 focus:ring-green-400"
                    placeholder="Email"
                    ref={emailEl}
                    name="email"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex items-center">
                    <input
                        ref={storeDataEl}
                        name="storeData"
                        type="checkbox"
                        id="storeData"
                        value="true"
                    />

                    <label
                        className="ml-3 text-md font-thin text-white cursor-pointer"
                        htmlFor="storeData"
                    >
                        Save my e-mail and name for the next time I comment
                    </label>
                </div>
            </div>
            {error && (
                <p className="text-xs text-red-500">All field are required</p>
            )}

            <div className="mt-9 flex-col flex justify-center">
                <button
                    className="transition-all border border-green-500 text-md font-thin hover:bg-green-500 text-white py-3 px-8 rounded-lg"
                    onClick={handleCommentSubmission}
                >
                    Post Comment
                </button>

                {showSuccessMessage && (
                    <span className="text-xl text-green-500">
                        Comment Submitted for Review !
                    </span>
                )}
            </div>
        </section>
    )
}
