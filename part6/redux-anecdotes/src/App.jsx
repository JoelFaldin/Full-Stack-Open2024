import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import getData from '../services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
    const dispatch = useDispatch()
        
    useEffect(() => {
        getData().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }, [dispatch]) // Eslint was recommending add 'dispatch' in the dependency array to avoid possible bugs and errors

    return (
        <div>
        <h2>Anecdotes</h2>
        <Filter />
        <AnecdoteList  />
        <AnecdoteForm />
        <Notification />
        </div>
    )
}

export default App