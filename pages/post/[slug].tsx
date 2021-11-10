import { getPosts, getPostDetails } from "services"

import {
    CommentsForm,
    Categories,
    PostWidget,
    PostDetail,
    Comments,
    Author,
} from "components"

export default function Post({ post }) {
    return (
        <main className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <CommentsForm slug={post.slug} />
                    <Comments slug={post.slug} />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <PostWidget
                            categories={post.categories.map(
                                (category) => category.slug
                            )}
                            slug={post.slug}
                        />
                        <Categories />
                    </div>
                </div>
            </div>
        </main>
    )
}

export async function getStaticProps({ params }) {
    const post = await getPostDetails(params.slug)

    return {
        props: { post },
    }
}

export async function getStaticPaths() {
    const posts = await getPosts()

    return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: false,
    }
}
