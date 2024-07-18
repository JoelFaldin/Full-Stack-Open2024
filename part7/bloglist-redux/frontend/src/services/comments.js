import axios from "axios";
const baseUrl = "/api/comments";

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getComments };
