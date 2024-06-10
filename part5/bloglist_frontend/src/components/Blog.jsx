import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, userName, blogs, setBlogs, handleMessages }) => {
    const [viewDetails, setViewDetails] = useState(false)

    const updateLikes = async () => {
        const token = localStorage.getItem('loggedToken')

        const updatedBlogs = blogs.map(object => {
            if (object.id === blog.id) {
                return { ...object, likes: object.likes + 1 }
            } else {
                return object
            }
        })

        try {
            const likesRequest = await blogService.addLike(blog.id, userName, blog.likes + 1, blog.author, blog.title, blog.url, token)
            if (likesRequest !== 200) {
                throw new Error('There was a problem updating the likes.')
            }
            setBlogs(updatedBlogs)
        } catch (error) {
            setBlogs(blogs)
        }
    }

    const handleDelete = async () => {
        if (confirm(`Do you want to remove this blog? "${blog.title}"`)) {
            const token = localStorage.getItem('loggedToken')
            try {
                const removeRequest = await blogService.removeBlog(blog.id, token)
                if (removeRequest.status !== 204) {
                    throw new Error('test')
                }

                const updatedBlogs = blogs.filter(object => {
                    return object.id !== blog.id
                })

                setBlogs(updatedBlogs)
            } catch (error) {
                handleMessages(error, 'error')
            }
        }
    }

    return !viewDetails ? (
        <div className="blog">
            <span className="blog-title">{blog.title} </span>
            -
            <span className="blog-author"> {blog.author}</span>
            <button onClick={() => setViewDetails(true)}>show details</button>
        </div>
    ) : (
        <div className="details">
            <p>
                <span className="blog-title">{blog.title}</span>
                -
                <span className="blog-author">{blog.author}</span>
            </p>
            <p className="blog-url">{blog.url}</p>
            <p>
                <span className="blog-likes"><span id="like-number">{blog.likes}</span> likes</span>
                <button className="like-button" onClick={() => updateLikes()}>like</button>
            </p>
            <button onClick={() => setViewDetails(false)}>hide details</button><br />
            {
                userName === blog.user.name ? (
                    <button onClick={handleDelete}>delete blog</button>
                ) : ('')
            }
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    handleMessages: PropTypes.func.isRequired
}

export default Blog