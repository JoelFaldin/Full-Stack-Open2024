import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router-dom"

import messageService from "../services/messages"

const BlogData = ({ blogs, updateLikes, handleDelete }) => {
  const match = useMatch("/blogs/:id");
  const blogId = match.params.id

  const messages = useQuery({
    queryKey: ["messages", blogId],
    queryFn: ({ queryKey }) => messageService.getMessages(queryKey[1]),
    retry: 1,
    enabled: !!blogId
  })

  if (blogs.isLoading || messages.isLoading) {
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

      <h3>Comments</h3>

      <label htmlFor="comment"></label>
      <input id="comment"></input>
      <button>comment</button>

      {messages.data.length === 0 ? (
        <p>There are no comments in this blog.</p>
      ) : (
        <ul>
          {messages.data.map(item => (
            <li key={item.id}>{item.message}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default BlogData