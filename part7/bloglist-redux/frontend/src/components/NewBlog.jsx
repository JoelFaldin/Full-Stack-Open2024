import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createBlog } from "../reducers/blogReducer";
import { newErrorNotif } from "../reducers/errNotifReducer";
import { newNotif } from "../reducers/notificationReducer";

const NewBlog = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createBlog(title, author, url, user.token));
      dispatch(newNotif(`Blog "${title}" was successfully added!`, 5000));

      setTitle("");
      setAuthor("");
      setUrl("");
      setIsVisible(false);
    } catch (error) {
      dispatch(newErrorNotif(error.message, 5000));
    }
  };

  return isVisible ? (
    <>
      <h1>Create a new blog:</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Blog title"
          />
        </div>

        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Blog author"
          />
        </div>

        <div>
          <label htmlFor="url">Url:</label>
          <input
            id="url"
            type="text"
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Blog url"
          />
        </div>
        <button onClick={handleCreate}>Create</button>
      </form>
      <button onClick={() => setIsVisible(false)}>cancel</button>
    </>
  ) : (
    <div>
      <button
        className="showForm"
        id="showForm"
        onClick={() => setIsVisible(true)}
      >
        new blog
      </button>
    </div>
  );
};

export default NewBlog;
