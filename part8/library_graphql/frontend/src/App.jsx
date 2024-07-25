import { Link, Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS } from "./queries";

const App = () => {
  const result = useQuery(ALL_AUTHORS)

  return (
    <div>
      <div>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/add">add book</Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors show={result.loading} data={result.data} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
