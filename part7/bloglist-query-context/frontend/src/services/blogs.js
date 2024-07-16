import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const newBlog = async ({ title, author, url, token }) => {
  const response = await axios.post(
    baseUrl,
    { title, author, url },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
};

const addLike = async (blogId, user, likes, author, title, url, token) => {
  const response = await axios.put(
    `${baseUrl}/${blogId}`,
    { user, likes, author, title, url },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.status;
};

const removeBlog = async (blogId, token) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { status: response.status, response: response.data };
};

export default { getAll, newBlog, addLike, removeBlog };
