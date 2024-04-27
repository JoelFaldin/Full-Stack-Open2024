import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const NewBlog = ({ handleMessages }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [isVisible, setIsVisible] = useState(false)

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
            <h1>Create a new blog:</h1>
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        onChange={event => setTitle(event.target.value)}
                        placeholder="Blog title"
                    />
                </div>

                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        id="author"
                        type="text"
                        onChange={event => setAuthor(event.target.value)}
                        placeholder="Blog author"
                    />
                </div>

                <div>
                    <label htmlFor="url">Url:</label>
                    <input
                        id="url"
                        type="text"
                        onChange={event => setUrl(event.target.value)}
                        placeholder="Blog url"
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
            <button className="showForm" onClick={() => setIsVisible(true)}>new blog</button>
        </div>
    )
}

NewBlog.propTypes = {
    handleMessages: PropTypes.func.isRequired
}

export default NewBlog