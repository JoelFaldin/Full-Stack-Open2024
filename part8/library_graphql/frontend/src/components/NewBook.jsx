import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { PropTypes } from 'prop-types'

import { ADD_BOOK, ALL_BOOKS, FILTER_BOOKS } from '../queries'

const NewBook = ({ setError, favGenre }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

    const [createBook] = useMutation(ADD_BOOK, {
      onError: (error) => {
        const errorMsg = error.graphQLErrors.map(e => e.message).join("/n")
        setError(errorMsg)
      },
      update: (cache, { data: { addBook } }) => {
      cache.updateQuery({ query: ALL_BOOKS }, (oldData) => {
        if (!oldData) {
          return { allBooks: [addBook] }
        }
  
        return {
          allBooks: oldData.allBooks.concat(addBook)
        }
      })

      if (addBook.genres.includes(favGenre)) {
        cache.updateQuery({ query: FILTER_BOOKS, variables: { genre: favGenre } }, (oldData) => {
          if (!oldData) {
            return { filterBooks: [addBook] }
          }

          return {
            filterBooks: oldData.filterBooks.concat(addBook)
          }
        })
      }
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    if (!title) {
      return setError("Please provide a title!")
    } else if (!author) {
      return setError("You should provide an author.")
    } else if (!published) {
      return setError("You must indicate when was the book published.")
    } else if (genres.length === 0) {
      return setError("Please select at least one genre.")
    }

    createBook({
      variables: {
        title,
        published: Number(published),
        author,
        genres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add a new book</h2>

      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

NewBook.propTypes = {
  setError: PropTypes.func.isRequired,
  favGenre: PropTypes.string.isRequired
}

export default NewBook