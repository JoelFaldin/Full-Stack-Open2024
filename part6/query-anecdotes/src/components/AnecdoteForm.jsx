import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../services/anecdoteService"
import { useNotifDispatch } from "../context/NotifContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifDispatch = useNotifDispatch()

  const newAnecdoteMutation = useMutation({
      mutationFn: addAnecdote,
      onSuccess: (newAnecdote) => {
          const anecdotes = queryClient.getQueryData(['anecdotes'])
          queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      
          notifDispatch({ type: 'added', anecdote: newAnecdote.content })
          setTimeout(() => {
              notifDispatch({ type: 'reset' })
          }, 5000)
      },
      onError: () => {
          notifDispatch({ type: 'error' })
          setTimeout(() => {
              notifDispatch({ type: 'reset' })
          }, 5000);
      }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
