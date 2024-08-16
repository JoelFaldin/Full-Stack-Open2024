import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import { Entry } from "../../../types";

interface HospitalEntry {
  entry: Entry
}

const HospitalEntry = ({ entry }: HospitalEntry) => {
  return (
    <div style={{ border: '1px solid black', paddingLeft: '5px', borderRadius: '15px' }}>
      <p>
        <span>{entry.date}</span>
        <LocalHospitalIcon />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>Diagnose by: {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntry;