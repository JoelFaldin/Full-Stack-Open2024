import express from 'express';

import patientService from '../services/patientService';
import toAddPatient from '../../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  return res.status(200).json(patientService.getPatients());
});

patientRouter.post('/', (req, res) => {

  try {
    const newPatient = toAddPatient(req.body);
    const savePatient = patientService.addPatient(newPatient);

    return res.status(201).json(savePatient);
  } catch (error: unknown) {
    let errorMsg = 'There was an error: ';
    if (error instanceof Error) {
      errorMsg += error.message;
    }

    return res.status(400).json({ error: errorMsg });
  }
});

export default patientRouter;