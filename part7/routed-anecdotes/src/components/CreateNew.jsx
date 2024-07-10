/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew, handleNotification }) => {
    const contentHook = useField('text')
    const content = { type: contentHook.type, value: contentHook.value, onChange: contentHook.onChange }

    const authorHook = useField('text')
    const author = { type: authorHook.type, value: authorHook.value, onChange: authorHook.onChange }

    const infoHook = useField('text')
    const info = { type: infoHook.type, value: infoHook.value, onChange: infoHook.onChange }


    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      handleNotification(`New anecdote: "${content.value}" added!`)
      navigate('/')
    }

    const handleReset = (event) => {
        event.preventDefault()
        contentHook.reset()
        authorHook.reset()
        infoHook.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button>create</button>
          <button onClick={event => handleReset(event)}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew