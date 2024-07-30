import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      _id
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
        title
        published
        author {
          name
          _id
        }
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
      author {
        name
        _id
      }
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
      _id
      bookCount  
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
        username: $username,
        password: $password
    ) {
        value
    }
}
`

export const ME = gql`
  query {
      me {
          name
          favoriteGenre
          id
      }
  }
`

export const FILTER_BOOKS = gql`
  query filter($genre: String!) {
    filterBooks(genre: $genre) {
        title
        published
        author {
            name
        }
        id
        genres
    }
  }
`