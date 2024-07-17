import axios from "axios";
const baseUrl = "/api/messages";

const getMessages = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const postMessage = async ({ comment, blogId, messages }) => {
  try {
    const response = await axios.post(`${baseUrl}/new`, { comment, blogId });
    return { response: response.data };
  } catch (error) {
    return { error, messages };
  }
};

export default { getMessages, postMessage };
