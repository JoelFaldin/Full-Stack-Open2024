/* eslint-disable react/prop-types */

import { Link, Routes, Route, useMatch } from "react-router-dom"
import AnecdoteList from "./AnecdoteList"
import CreateNew from './CreateNew'
import About from './About'
import Anecdote from "./Anecdote"

const Menu = ({ anecdotes, addNew, handleNotification }) => {
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(item => item.id === Number(match.params.id)) : null

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/" >anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} handleNotification={handleNotification} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
      </Routes>
    </div>
  )
}

export default Menu
