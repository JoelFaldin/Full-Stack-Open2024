import axios from "axios";
const baseUrl = "/api/comments";

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const addComment = async (message, blogId) => {
  const response = await axios.post(`${baseUrl}/new`, { message, blogId });
  return response.data;
};

export default { getComments, addComment };
