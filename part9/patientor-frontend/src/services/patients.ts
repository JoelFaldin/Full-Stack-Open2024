import axios, { AxiosError } from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatientInfo = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const createEntry = async (userId: string, object: NewEntry) => {
  try {
    const response = await axios.post<Entry>(`${apiBaseUrl}/patients/${userId}/entries`, object);
    return response.data;
  } catch (error: unknown) {
    let errMsg = 'There was an error: ';
    if (error instanceof AxiosError) {
      errMsg += JSON.stringify(error.response?.data.error);
    }

    throw new Error(errMsg);
  }
};

export default {
  getAll, create, getPatientInfo, createEntry
};

