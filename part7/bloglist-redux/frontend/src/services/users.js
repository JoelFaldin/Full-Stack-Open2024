import axios from "axios";
const baseUrl = "/api/users";

const getUserData = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

export default { getUserData };
