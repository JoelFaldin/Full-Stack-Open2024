import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from "../services/anecdoteService"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => { 
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
    
        const response = await anecdoteService.createAnecdote(anecdote)
        dispatch(addAnecdote(response))
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