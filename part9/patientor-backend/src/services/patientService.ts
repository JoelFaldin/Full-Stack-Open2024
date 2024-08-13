import { v1 as uuid } from 'uuid';

import patientData, { data } from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../../types";

const getPatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id,
    ...patient
  };
  patientData.push(newPatient);

  return newPatient;
};

const findPatient = (id: string): Patient | null => {
  const patient = data.find(d => d.id === id);

  if (!patient) {
    throw new Error('Patient not found.');
  } else {
    return patient;
  }
};

export default { getPatients, addPatient, findPatient };