import { Box, Button, Input, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";

import patientService from '../../../services/patients';
import { NewEntry, Patient } from "../../../types";
import { codesConstant } from "../../../constants";

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
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState('');
  const [codes, setCodes] = useState<Array<string>>([]);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employer, setEmployer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [health, setHealth] = useState<number | ''>('');

  const [form, setForm] = useState<FormEnum>(FormEnum.Hospital);

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

  const handleHealthRating = (event: SelectChangeEvent<number>) => {
    setHealth(Number(event.target.value));
  };

  const handleChangeCode = (event: SelectChangeEvent<typeof codes>) => {
    const {
      target: { value },
    } = event;
    setCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
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
          <Input type="date" value={date} onChange={event => setDate(event.target.value)} />
        </Box>

        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <TextField label="Specialist" type="text" value={specialist} onChange={event => setSpecialist(event.target.value)} />
        </Box>

        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <InputLabel id="multiple-codes-label">Diagnosis codes</InputLabel>
          <Select
            labelId="multiple-codes-label"
            id="multiple-codes"
            multiple
            value={codes}
            onChange={handleChangeCode}
            input={<OutlinedInput label="Codes" />}
          >
            {
              codesConstant.map(codeValue => (
                <MenuItem
                  key={codeValue}
                  value={codeValue}
                >
                  {codeValue}
                </MenuItem>
              ))
            }
          </Select>
        </Box>

        {
          form === "Hospital" ? (
            <>
              <p>Discharge:</p>
              <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <Input type="date" value={dischargeDate} onChange={event => setDischargeDate(event.target.value)} />
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
              <p>Sickleave info:</p>
              <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <p>Start date:</p>
                <Input type="date" value={startDate} onChange={event => setStartDate(event.target.value)} />
              </Box>
              <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <p>End date:</p>
                <Input type="date" value={endDate} onChange={event => setEndDate(event.target.value)} />
              </Box>
            </>
          ) : (
            <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
              <InputLabel id="health">HealthCheck rating</InputLabel>
              <Select
                labelId="health"
                id="health-input"
                value={health}
                onChange={handleHealthRating}
              >
                <MenuItem disabled>
                  <em>Select an option</em>
                </MenuItem>
                <MenuItem value={0}>Healthy</MenuItem>
                <MenuItem value={1}>Low Risk</MenuItem>
                <MenuItem value={2}>High Risk</MenuItem>
                <MenuItem value={3}>Critial Risk</MenuItem>
              </Select>

              {/* <TextField label="HealthCheck rating" type="number" value={health} onChange={event => setHealth(Number(event.target.value))} /> */}
            </Box>
          )
        }

        

        <Button color="primary" variant="contained" type="submit">Create Entry</Button>
      </form>
    </Box>
  );
};

export default EntryForm;