import { PropTypes } from "prop-types"
import UpdateBirthYear from "./UpdateBirthYear"

const Authors = ({ show, data, setError }) => {
  if (show) {
    return null
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <UpdateBirthYear setError={setError} authors={data.allAuthors} />
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    allAuthors: PropTypes.arrayOf(
      PropTypes.shape({
        __typename: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        born: PropTypes.number,
        _id: PropTypes.string.isRequired,
        bookCount: PropTypes.number
      })
    ).isRequired
  }),
  setError: PropTypes.func.isRequired
}

export default Authors
