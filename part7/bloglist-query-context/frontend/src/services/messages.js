import axios from "axios";
const baseUrl = "/api/messages";

const getMessages = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getMessages };
