/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  return res.status(200).json(patientService.getPatients());
});

patientRouter.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const savePatient = patientService.addPatient({ name, dateOfBirth, ssn, gender, occupation });
  return res.status(201).json(savePatient);
});

export default patientRouter;