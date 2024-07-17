import { useMatch } from "react-router-dom"

const BlogData = ({ blogs, updateLikes, handleDelete }) => {
  const match = useMatch("/blogs/:id");

  if (blogs.isLoading) {
    return <div>Loading blog data...</div>
  }

  const blogData = blogs ? blogs.data.find(item => item.id === match.params.id) : null;

  return (
    <>
      <h2>{blogData.title}</h2>
      <a href={blogData.url}>{blogData.url}</a>
      <p>
        <span>{blogData.likes} likes</span>
        <button onClick={() => updateLikes(blogData, blogs.data)}>like</button>
      </p>
      <p>added by <strong>{blogData.author}</strong></p>
      <button onClick={() => handleDelete(blogData)}>delete blog</button>
    </>
  )
}

export default BlogData