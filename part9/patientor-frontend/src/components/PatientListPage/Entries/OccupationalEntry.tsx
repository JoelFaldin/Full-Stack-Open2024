import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

import { Entry } from "../../../types";

interface OccupationalInterface {
    entry: Entry
}

const OccupationalEntry = ({ entry }: OccupationalInterface) => {
  return (
    <div style={{ border: '1px solid black', paddingLeft: '5px', borderRadius: '15px' }}>
      <p>
        <span>{entry.date}</span>
        <MedicalServicesIcon />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>Diagnose by: {entry.specialist}</p>
    </div>
  );
};

export default OccupationalEntry;