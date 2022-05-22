// typeDefs file to replace models file
const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Auth {
        token: ID!
        user: User
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int
        savedBooks: [Book]

    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }

    type BookInput {
        bookId: String
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }


    Type Query {
        me: User
    }

    Type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        deleteBook(bookId: ID!): User
    }

`

module.exports = typeDefs;