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

enum FormEnum {
  Hospital = 'Hospital',
  Occupational = 'OccupationalHealthcare',
  Health = 'HealthCheck'
}

const EntryForm = ({ patientId, setPatient, hideForm, setErrorMsg }: EntryFormInterface) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [codes, setCodes] = useState<Array<string>>([]);
  const [codeValue, setCode] = useState('');

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employer, setEmployer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [health, setHealth] = useState(0);

  const [form, setForm] = useState<FormEnum>(FormEnum.Hospital);

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
        type: form,
        specialist,
        diagnosisCodes: codes
      }
    };

    const customEntry = {
      entry: {
        ...entry.entry,
        ...(form === "Hospital" && {
          discharge:
            { date: dischargeDate,
              criteria: dischargeCriteria
            }
          }),
        ...(form === "OccupationalHealthcare" && {
          employerName: employer,
          sickLeave: {
            startDate,
            endDate
          } }),
        ...(form === "HealthCheck" && {
          healthCheckRating: health
        })
      }
    };
    console.log(customEntry);

    try {
      const res = await patientService.createEntry(patientId, customEntry as unknown as NewEntry);
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
      <button onClick={() => setForm(FormEnum.Hospital)}>hospital entry</button>
      <button onClick={() => setForm(FormEnum.Occupational)}>occupational healthcare</button>
      <button onClick={() => setForm(FormEnum.Health)}>healthcheck</button>


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

        {
          form === "Hospital" ? (
            <>
              <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <TextField label="Discharge date" value={dischargeDate} onChange={event => setDischargeDate(event.target.value)} />
              </Box>
              <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <TextField label="Discharge Criteria" value={dischargeCriteria} onChange={event => setDischargeCriteria(event.target.value)} />
              </Box>
            </>
          ) : form === 'OccupationalHealthcare' ? (
            <>
              <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <TextField label="Employer name" value={employer} onChange={event => setEmployer(event.target.value)} />
              </Box>
              <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <TextField label="Sickleave start" value={startDate} onChange={event => setStartDate(event.target.value)} />
              </Box>
              <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <TextField label="Sickleave end" value={endDate} onChange={event => setEndDate(event.target.value)} />
              </Box>
            </>
          ) : (
            <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <TextField label="HealthCheck rating" type="number" value={health} onChange={event => setHealth(Number(event.target.value))} />
            </Box>
          )
        }

        

        <Button color="primary" variant="contained" type="submit">Create Entry</Button>
      </form>
    </Box>
  );
};

export default EntryForm;