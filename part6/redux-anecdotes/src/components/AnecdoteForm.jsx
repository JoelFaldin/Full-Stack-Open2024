import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleNewAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
    
        dispatch(createAnecdote(anecdote))
    }
    
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleNewAnecdote}>
                <div>
                    <input type="text" name="anecdote" />
                </div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm