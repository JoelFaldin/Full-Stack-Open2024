import { Link, Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const authorResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  return (
    <div>
      <div>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/add">add book</Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors show={authorResult.loading} data={authorResult.data} />} />
        <Route path="/books" element={<Books show={booksResult.loading} data={booksResult.data} />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
