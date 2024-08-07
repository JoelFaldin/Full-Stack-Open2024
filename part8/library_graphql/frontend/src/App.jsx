import { Link, Routes, Route } from "react-router-dom";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import { PropTypes } from "prop-types"
import { gql } from "@apollo/client"

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from "./queries";
import Recommended from "./components/Recommended";

const App = () => {
  const authorResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const alertUser = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const client = useApolloClient()
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      alert(`Info: Added book ${data.data.bookAdded.title}!`)

      client.cache.modify({
        fields: {
          allBooks(existing = []) {
            const newBookRef = client.cache.writeFragment({
              data: data.data.bookAdded,
              fragment: gql`
                fragment NewBook on Books {
                  id
                  title
                  author {
                    name
                  }
                  published
                  genres
                }
              `
            })
            return [...existing, newBookRef]
          }
        }
      })
    }
  })

  if (!token) {
    return (
      <>
        <Notification errorMessage={errorMessage} />
        <h2>Login</h2>
        <Login
          setToken={setToken}
          alertUser={alertUser}
        />
      </>
    )
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
        <Link to="/">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>
        <Link to="/add">
          <button>add book</button>
        </Link>
        <Link to="/recommend">
          <button>recommend</button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors show={authorResult.loading} data={authorResult.data} setError={alertUser} />} />
        <Route path="/books" element={<Books show={booksResult.loading} data={booksResult.data} />} />
        <Route path="/add" element={<NewBook setError={alertUser} favGenre={user.data.me.favoriteGenre} />} />
        <Route path="/recommend" element={<Recommended user={user.data.me} />} />
      </Routes>
    </div>
  );
};

const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: "red" }}>
      {errorMessage}
    </div>
  )
}

Notification.propTypes = {
  errorMessage: PropTypes.string
}

export default App;
