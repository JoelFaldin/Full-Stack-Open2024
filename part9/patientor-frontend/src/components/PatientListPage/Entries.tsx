import { Patient } from "../../types";
// import DiagnosisCodes from "./DiagnosisCodes";
import HealthCheckEntry from "./Entries/HealthCheckEntry";
import HospitalEntry from "./Entries/HospitalEntry";
import OccupationalEntry from "./Entries/OccupationalEntry";

interface EntryInterface {
  patient: Patient
}

const Entries = ({ patient }: EntryInterface) => {
  const assertNever = (data: never): never => {
    throw new Error(`Unhandled entry type: ${JSON.stringify(data)}`);
  };

  return (
    <>
      <h3>entries</h3>
      {
        patient?.entries.map(entry => {
          switch (entry.type) {
            case "Hospital":
              return <HospitalEntry key={entry.id} entry={entry} />;
            case "HealthCheck":
              return <HealthCheckEntry key={entry.id} entry={entry} />;
            case "OccupationalHealthcare":
              return <OccupationalEntry key={entry.id} entry={entry} />;
            default:
              return assertNever(entry);
          }
          // <div key={entry.id}>
          //   <span>{entry.date}</span>
          //   <p>Description: <i>{entry.description}</i></p>

          //   {
          //   entry.diagnosisCodes ? entry.diagnosisCodes.map(code => (
          //     <DiagnosisCodes key={code} code={code} />
          //   )) : (
          //     <></>
          //   )
          //   }
          // </div>
        })
      }
    </>
  );
};

export default Entries;