import axios from "axios";
import { DiariesType } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

const getDiaries = async () => {
  const response = await axios.get<DiariesType[]>(baseUrl)
  return response.data
}

export default { getDiaries }