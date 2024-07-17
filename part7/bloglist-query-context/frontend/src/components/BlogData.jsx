import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router-dom"
import { useState } from "react";

import messageService from "../services/messages"
import { setErrorNotif } from "../actions/notificationActions"

const BlogData = ({ dispatch, blogs, updateLikes, handleDelete }) => {
  const queryClient = useQueryClient();
  const match = useMatch("/blogs/:id");
  const blogId = match.params.id

  const [comment, setComment] = useState("")

  const messages = useQuery({
    queryKey: ["messages", blogId],
    queryFn: ({ queryKey }) => messageService.getMessages(queryKey[1]),
    retry: 1,
    enabled: !!blogId
  })

  const messageMutation = useMutation({
    mutationFn: messageService.postMessage,
    onSuccess: ({ response }) => {
      const messages = queryClient.getQueryData(["messages", blogId])

      queryClient.setQueryData(["messages", blogId], [...messages, response.message])
    },
    onError: (error) => {
      queryClient.setQueryData(["messages"], messages)
      setErrorNotif(dispatch, "There was an error trying to save the comment.", 5000)
    }
  })

  const sendMessage = async () => {
    messageMutation.mutate({ comment, blogId, messages: messages.data })
    setComment("")
  }

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
      <input id="comment" value={comment} onChange={event => setComment(event.target.value)}></input>
      <button onClick={sendMessage}>comment</button>

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