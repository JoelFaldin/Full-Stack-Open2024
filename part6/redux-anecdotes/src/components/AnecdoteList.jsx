import { useDispatch, useSelector } from "react-redux"
import { addVote, newNotification } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter === 'ALL') {
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })
    
    const vote = (id) => {
        const content = anecdotes.find(item => item.id === id).content

        dispatch(addVote(id, anecdotes))

        dispatch(newNotification('you voted for ' + '"' + content + '"', 5000))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList