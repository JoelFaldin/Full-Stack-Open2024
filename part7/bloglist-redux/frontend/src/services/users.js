import axios from "axios";
const baseUrl = "/api/users";

const getUserData = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

const getUsersBlogs = async (id) => {
  const response = await axios.get(`${baseUrl}/user/${id}`);
  return response.data;
};

export default { getUserData, getUsersBlogs };
