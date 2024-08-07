import data from "../../data/patients";
import { NonSSNPatient } from "../../types";

const getPatients = (): NonSSNPatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default { getPatients };