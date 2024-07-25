import { useMutation } from "@apollo/client"
import { useState } from "react"
import { PropTypes } from "prop-types"

import { ALL_AUTHORS, SET_BIRTHYEAR } from "../queries"

const UpdateBirthYear = ({ setError }) => {
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
        name,
        birthyear: Number(born)
      }
    })

    setName("")
    setBorn("")
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={updateYear}>
        <div>
          name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
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
  setError: PropTypes.func.isRequired
}

export default UpdateBirthYear