import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default function comments(req, res) {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    })

    const query = gql`
        mutation CreateComment(
            $comment: String!
            $email: String!
            $name: String!
            $slug: String!
        ) {
            createComment(
                data: {
                    post: { connect: { slug: $slug } }
                    comment: $comment
                    email: $email
                    name: $name
                }
            ) {
                id
            }
        }
    `

    try {
        const result = graphQLClient.request(query, req.body)
        return res.status(200).send(result)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}
