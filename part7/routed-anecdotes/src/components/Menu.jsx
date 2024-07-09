/* eslint-disable react/prop-types */

import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom"
import AnecdoteList from "./AnecdoteList"
import CreateNew from './CreateNew'
import About from './About'
import Footer from './Footer'

const Menu = ({ anecdotes, addNew }) => {
    const padding = {
      paddingRight: 5
    }
    return (
        <div>
            <Router>
                <Link style={padding} to="/" >anecdotes</Link>
                <Link style={padding} to="/create">create new</Link>
                <Link style={padding} to="/about">about</Link>
        
                <Routes>
                <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path="/create" element={<CreateNew addNew={addNew} />} />
                <Route path="/about" element={<About />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    )
}

export default Menu
