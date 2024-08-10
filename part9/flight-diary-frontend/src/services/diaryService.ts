import axios from "axios";
import { DiariesType, NonIdDiary } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

const getDiaries = async () => {
  const response = await axios.get<DiariesType[]>(baseUrl)
  return response.data
}

const submitDiary = async (object: NonIdDiary) => {
  const response = await axios.post<DiariesType>(baseUrl, object)
  return response.data
}

export default { getDiaries, submitDiary }