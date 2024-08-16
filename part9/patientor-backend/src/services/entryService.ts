import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';
import { NewEntry } from '../../types';

const addEntry = (userId: string, entry: NewEntry) => {
    const id: string = uuid();
    const newEntry = {
        id,
        ...entry,
    };

  try {
    const user = patientData.find(patient => patient.id === userId);
    if (user) {
        user.entries.push(newEntry);
        return newEntry;
    } else {
        throw new Error('Patient not found.');
    }
  } catch (error) {
    return error;
  }
};

export default { addEntry };