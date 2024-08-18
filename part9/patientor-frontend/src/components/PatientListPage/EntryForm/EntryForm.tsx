import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

import patientService from '../../../services/patients';
import { NewEntry, Patient } from "../../../types";

interface EntryFormInterface {
  patientId: string,
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>,
  hideForm: () => void,
  setErrorMsg: (message: string) => void
}

const EntryForm = ({ patientId, setPatient, hideForm, setErrorMsg }: EntryFormInterface) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [codes, setCodes] = useState<Array<string>>([]);
  const [codeValue, setCode] = useState('');
  const [health, setHealth] = useState(0);

  const handleCodes = () => {
    if (codeValue.length === 0) {
      return alert('You should enter some input!');
    }

    const findCode = codes.indexOf(codeValue);
    if (findCode !== -1 && codes.length !== 0) {
      return alert('The code already exists. Try another one.');
    }

    const updatedCodes = [
      ...codes,
      codeValue
    ];
    setCodes(updatedCodes);

    setCode('');
  };

  const submitEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entry = {
      "entry": {
        description,
        date,
        type: "HealthCheck",
        specialist,
        healthCheckRating: health,
        diagnosisCodes: codes
      }
    };

    try {
      const res = await patientService.createEntry(patientId, entry as unknown as NewEntry);
      setPatient(prev => {
        if (prev) {
          return {
            ...prev,
            entries: [...(prev?.entries || []), res]
          };
        }
        return prev;
      });

      setDescription('');
      setDate('');
      setSpecialist('');
      setCodes([]);
      setCode('');
      setHealth(0);

      hideForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        alert(JSON.stringify(error));
      }
    }
  };

  return (
    <Box sx={{ m: 2 }} style={{ border: '1px dashed black', padding: '10px' }}>
      <form onSubmit={submitEntry}>
        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <TextField label="Description" type="text" value={description} onChange={event => setDescription(event.target.value)} />
        </Box>

        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <TextField label="Date" type="text" value={date} onChange={event => setDate(event.target.value)} />
        </Box>

        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <TextField label="Specialist" type="text" value={specialist} onChange={event => setSpecialist(event.target.value)} />
        </Box>

        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <TextField label="Diagnosis codes" type="text" value={codeValue} onChange={event => setCode(event.target.value)} />
        </Box>
        <p>
          codes:
          {
            codes.map(item => (
              <span key={item}> {item}</span>
            ))
          }
        </p>

        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <Button color="primary" variant="contained" value={codeValue} onClick={handleCodes}>Add</Button>
        </Box>
        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <TextField label="HealthCheck rating" type="number" value={health} onChange={event => setHealth(Number(event.target.value))} />
        </Box>

        <Button color="primary" variant="contained" type="submit">Create Entry</Button>
      </form>
    </Box>
  );
};

export default EntryForm;