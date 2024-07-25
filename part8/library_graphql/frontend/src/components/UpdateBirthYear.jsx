import { useMutation } from "@apollo/client"
import { useState } from "react"
import { PropTypes } from "prop-types"
import Select from "react-select"

import { ALL_AUTHORS, SET_BIRTHYEAR } from "../queries"

const UpdateBirthYear = ({ setError, authors }) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")

  const [updateAuthor] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const errorMsg = error.graphQLErrors.map(e => e.message).join("/n")
      setError(errorMsg)
    }
  })

  const updateYear = (event) => {
    event.preventDefault()

    if (!name) {
      return setError("Please indicate the name of the author.")
    } else if (!born) {
      return setError("You should indicate the new birth year!")
    }

    updateAuthor({
      variables: {
        name: name.value,
        birthyear: Number(born)
      }
    })

    setName(null)
    setBorn("")
  }
  
  const formattedAuthors = authors.map(a => {
    return { value: a.name, label: a.name }
  })

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={updateYear}>
        <Select
          value={name}
          onChange={setName}
          options={formattedAuthors}
          isClearable
        />
        <div>
          born
          <input
            value={born}
            type="number"
            onChange={(event) => setBorn(event.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

UpdateBirthYear.propTypes = {
  setError: PropTypes.func.isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      born: PropTypes.number,
      id: PropTypes.string.isRequired,
      bookCount: PropTypes.number
    })
  )
}

export default UpdateBirthYear