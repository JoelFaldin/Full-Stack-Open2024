import { useQuery } from "@apollo/client"
import { PropTypes } from "prop-types"
import { FILTER_BOOKS } from "../queries"

const Recommended = ({ user }) => {
  const recommendations = useQuery(FILTER_BOOKS, {
    variables: { genre: user.favoriteGenre }
  })

  if (recommendations.loading) {
    return <p>Loading data...</p>
  }

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
          {recommendations.data.filterBooks.map(item => (
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
  })
}