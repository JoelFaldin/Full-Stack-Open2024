import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { PropTypes } from 'prop-types'

import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      const errorMsg = error.graphQLErrors.map(e => e.message).join("/n")
      setError(errorMsg)
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

    console.log('add book...')

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
  setError: PropTypes.func.isRequired
}

export default NewBook