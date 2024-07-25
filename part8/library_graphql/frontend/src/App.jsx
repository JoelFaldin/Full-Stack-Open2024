import { Link, Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { PropTypes } from "prop-types"

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const authorResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  const [errorMessage, setErrorMessage] = useState(null)

  const alertUser = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/add">add book</Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors show={authorResult.loading} data={authorResult.data} setError={alertUser} />} />
        <Route path="/books" element={<Books show={booksResult.loading} data={booksResult.data} />} />
        <Route path="/add" element={<NewBook setError={alertUser} />} />
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
