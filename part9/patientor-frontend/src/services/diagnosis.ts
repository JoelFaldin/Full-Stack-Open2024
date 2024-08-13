import axios from "axios";
import { DescInterface } from "../types";

const baseUrl = 'http://localhost:3001/api/diagnoses';

const getDescInfo = async () => {
  const result = await axios.get<DescInterface[]>(baseUrl);
  return result.data;
};

export default { getDescInfo };