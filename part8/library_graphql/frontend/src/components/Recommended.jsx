import { PropTypes } from "prop-types"

const Recommended = ({ user, data }) => {
  const filteredData = data.allBooks.filter(books => books.genres.includes(user.favoriteGenre))
  
  return (
    <>
      <h2>Book recommendations</h2>
      <p>Favorite genre: <strong>{user.favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th><strong>author</strong></th>
            <th><strong>published</strong></th>
          </tr>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.author.name}</td>
              <td>{item.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Recommended

Recommended.propTypes = {
  user: PropTypes.shape({
    __typename: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    favoriteGenre: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }),
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