const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Blog {
        _id: ID!
        title: String!
        content: String!
        createdAt: String!
        updatedAt: String!
        creator: User!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        createdBlogs: [Blog!]
    }
    
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input BlogInput {
        title: String!
        content: String!
    }

    type RootQuery {
        blogs: [Blog!]!
        blog(id: ID!): Blog!
        login(email: String!, password: String!): AuthData!
        UserBlogs(userId: ID!): [Blog!]
    }

    type RootMutation {
        createBlog(blogInput: BlogInput): Blog!
        updateBlog(id: ID!, title: String, content: String): Blog!
        deleteBlog(id: ID!): Blog!
        createUser(email: String!, password: String!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
