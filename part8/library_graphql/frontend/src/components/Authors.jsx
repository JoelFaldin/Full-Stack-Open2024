import { PropTypes } from "prop-types"

const Authors = ({ show, data }) => {
  if (show) {
    return null
  }
  console.log(data)
  

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
        id: PropTypes.string.isRequired,
        bookCount: PropTypes.number.isRequired
      })
    ).isRequired
  })
}

export default Authors
