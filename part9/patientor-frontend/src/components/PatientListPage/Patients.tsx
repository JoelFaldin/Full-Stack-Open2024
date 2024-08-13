import { useMatch } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from "react";

import { Patient } from "../../types";
import patientService from "../../services/patients";
import Entries from "./Entries";

const PatientsDetails = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  
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