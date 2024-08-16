import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

import { Entry } from "../../../types";

interface HealthCheckInterface {
  entry: Entry
}

const HealthCheckEntry = ({ entry }: HealthCheckInterface) => {
  return (
    <div style={{ border: '1px solid black', paddingLeft: '5px', borderRadius: '15px' }}>
      <p>
        <span>{entry.date}</span>
        <HealthAndSafetyIcon />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>Diagnose by: {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntry;