import express from 'express';

import patientService from '../services/patientService';
import entryService from '../services/entryService';
import parseData from '../../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  return res.status(200).json(patientService.getPatients());
});

patientRouter.post('/', (req, res) => {

  try {
    const newPatient = parseData.toAddPatient(req.body);
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

patientRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  
  try {
    const searchPatient = patientService.findPatient(id);
    return res.status(200).json(searchPatient);
  } catch (error: unknown) {
    let msg = 'There was an error: ';
    if (error instanceof Error) {
      msg += error.message;
    }
    return res.status(400).json({ error: msg });
  }
});

patientRouter.post('/:id/entries', (req, res) => {
  const id = req.params.id;

  try {
    const newEntry = parseData.toAddEntry(req.body);
    const saveEntry = entryService.addEntry(id, newEntry);

    return res.status(201).json(saveEntry);
  } catch (error: unknown) {
    let errorMsg = 'There was an error trying to save the entry. ';
    if (error instanceof Error) {
      errorMsg += error.message;
    }

    return res.status(400).json({ error: errorMsg });
  }
});

export default patientRouter;