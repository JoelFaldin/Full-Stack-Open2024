import { PropTypes } from "prop-types"
import { useState } from "react"

const Books = ({ show, data }) => {
  const [filter, setFilter] = useState(null)

  if (show) {
    return null
  }
  
  const genres = data.allBooks.map(g => g.genres).flat()
  const uniqueGenres = [...new Set(genres)]

  const filteredData = filter ? data.allBooks.filter(b => b.genres.includes(filter)) : data.allBooks

  return (
    <div>
      <h2>books</h2>

      {filter ? (
        <p>Selected genre: <strong>{filter}</strong></p>
      ) : (
        <></>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredData.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.map(g => (
        <button key={g} onClick={() => setFilter(g)}>{g}</button>
      ))}
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    allBooks: PropTypes.arrayOf(
      PropTypes.shape({
        __typename: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        published: PropTypes.number.isRequired,
        author: PropTypes.shape({
          __typename: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          _id: PropTypes.string.isRequired,

        }),
        id: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(
          PropTypes.string
        )
      })
    ).isRequired
  })
}

export default Books
