import axios from "axios";
import { DiariesType, NonIdDiary } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

const getDiaries = async () => {
  const response = await axios.get<DiariesType[]>(baseUrl)
  return response.data
}

const submitDiary = async (object: NonIdDiary) => {
  try {
    const response = await axios.post<DiariesType>(baseUrl, object)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data)
    } else {
      throw new Error('There was an error. Try again later.')
    }
  }
}

export default { getDiaries, submitDiary }