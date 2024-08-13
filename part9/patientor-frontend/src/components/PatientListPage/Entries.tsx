import { Patient } from "../../types";
import DiagnosisCodes from "./DiagnosisCodes";

interface EntryInterface {
  patient: Patient
}

const Entries = ({ patient }: EntryInterface) => {
  return (
    <>
      <h3>entries</h3>
      {
        patient?.entries.map(entry => (
          <div key={entry.id}>
            <span>{entry.date}</span>
            <p>Description: <i>{entry.description}</i></p>

            {
              entry.diagnosisCodes ? (
                <DiagnosisCodes codes={entry.diagnosisCodes} />
              ) : (
                <></>
              )
            }
          </div>
        ))
      }
    </>
  );
};

export default Entries;