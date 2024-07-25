import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
        title
        published
        author
        id
        genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title,
      published,
      author,
      id,
      genres
    }
  }
`

export const SET_BIRTHYEAR = gql`
  mutation updateBirthYear($name: String!, $birthyear: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $birthyear
    ) {
      name
      born
      id
      bookCount  
    }
  }
`