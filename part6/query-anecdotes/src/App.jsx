import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, udpateAnecdote } from './services/anecdoteService'
import { useNotifDispatch } from './context/NotifContext'

const App = () => {
  const queryClient = useQueryClient()
  const notifDispatch = useNotifDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes(),
    retry: 1
  })

  const addVoteMutation = useMutation({
    mutationFn: udpateAnecdote,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)

      notifDispatch({ type: 'voted', anecdote: votedAnecdote.content })
      setTimeout(() => {
        notifDispatch({ type: 'reset' })
      }, 5000)
    }
  })

  const handleVote = (anecdote) => {
    const newAnecdote = {
      content: anecdote.content,
      votes: anecdote.votes + 1,
      id: anecdote.id
    }
    addVoteMutation.mutate(newAnecdote)
  }

  if (result.isLoading) {
    return <div>Loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
