import { useMatch } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { Patient } from "../../types";
import patientService from "../../services/patients";
import Entries from "./Entries";
import EntryForm from "./Forms/EntryForm";
import ErrorNotif from "../ErrorNotif";

const PatientsDetails = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const match = useMatch('/patients/:id');

  useEffect(() => {
    const getPatientInfo = async () => {
      if (match?.params.id) {
        const patientInfo = await patientService.getPatientInfo(match?.params.id);
        setPatient(patientInfo);
      }
    };
    void getPatientInfo();
  }, [match?.params.id]);

  if (!patient) {
    return <p>Loading user...</p>;
  }

  const showError = (message: string) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg(null);
    }, 5000);
  };

  return (
    <>
      <h2>{patient?.name}</h2>
      {
        patient?.gender === 'male' ? (
          <p>
            <MaleIcon />
          </p>
        ) : (
          <p>
            <FemaleIcon />
          </p>
        )
      }

      <span>ssh: {patient?.ssn}</span>
      <br />
      <span>occupation: {patient?.occupation}</span>
      <br />

      {
        errorMsg ? (
          <ErrorNotif error={errorMsg} />
        ) : (
          <></>
        )
      }

      <Button variant="contained" color="secondary" onClick={() => setShowEntryForm(!showEntryForm)}>
        {
          showEntryForm ? "Hide entry form" : "Add new Entry"
        }
      </Button>
      {
        showEntryForm ? (
          <EntryForm
            patientId={patient.id}
            setPatient={setPatient}
            hideForm={() => setShowEntryForm(false)}
            setErrorMsg={showError}
          />
        ) : (
          <></>
        )
      }
      {
        patient.entries.length !== 0 ? (
          <Entries patient={patient} />
        ) : (
          <></>
        )
      }
    </>
  );
};

export default PatientsDetails;