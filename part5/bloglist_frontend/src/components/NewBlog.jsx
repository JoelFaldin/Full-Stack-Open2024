import { useState } from "react"
import blogService from '../services/blogs'

const newBlog = ({ handleMessages }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrl = (event) => {
        setUrl(event.target.value)
    }

    const handleCreate = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('loggedToken')
            const create = await blogService.newBlog(title, author, url, token)
            handleMessages(create, 'success')
        } catch (error) {
            handleMessages(error, 'error')
        }
    }

    return isVisible ? (
        <>
            <h1>Create a new user</h1>
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        onChange={handleTitle}
                    />
                </div>

                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        id="author"
                        type="text"
                        onChange={handleAuthor}
                    />
                </div>

                <div>
                    <label htmlFor="url">Url:</label>
                    <input
                        id="url"
                        type="text"
                        onChange={handleUrl}
                    />
                </div>
                <button onClick={handleCreate}>
                    Create
                </button>
            </form>
            <button onClick={() => setIsVisible(false)}>cancel</button>
        </>
    ) : (
        <div>
            <button onClick={() => setIsVisible(true)}>new note</button>
        </div>
    )
}

export default newBlog