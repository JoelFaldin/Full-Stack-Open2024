import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
    
        dispatch(addAnecdote(anecdote))
    }
    
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div>
                    <input type="text" name="anecdote" />
                </div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm