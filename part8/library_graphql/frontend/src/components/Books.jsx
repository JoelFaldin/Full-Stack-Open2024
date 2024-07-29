import { PropTypes } from "prop-types"

const Books = ({ show, data }) => {
  if (show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
