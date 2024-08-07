import { v1 as uuid } from 'uuid';

import data from "../../data/patients";
import { NewPatient, NonSSNPatient, PatientData } from "../../types";

const getPatients = (): NonSSNPatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): PatientData => {
  const id: string = uuid();
  const newPatient = {
    id,
    ...patient
  };
  data.push(newPatient);

  return newPatient;
};

export default { getPatients, addPatient };