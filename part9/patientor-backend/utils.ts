import { DiagnoseData, Entry, Gender, HealthCheckRating, NewEntry, NewPatient } from "./types";

const toAddPatient = (data: unknown): NewPatient => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid or missing data.');
  }

  if ('name' in data && 'dateOfBirth' in data && 'ssn' in data && 'gender' in data && 'occupation' in data && 'entries' in data) {
    const newPatient = {
      name: parseName(data.name),
      dateOfBirth: parseDate(data.dateOfBirth),
      ssn: parseSSN(data.ssn),
      gender: parseGender(data.gender),
      occupation: parseOccupation(data.occupation),
      entries: data.entries as Entry[]
    };

    return newPatient;
  }

  throw new Error('Error: missing fields.');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Invalid or missing name field.');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (arg: unknown): string => {
  if (!isString(arg) || !isDate(arg)) {
    throw new Error('Invalid or missing date of birth field.');
  }

  return arg;
};

const parseSSN = (arg: unknown): string => {
  if (!isString(arg)) {
    throw new Error('Invalid or missing ssn.');
  }

  return arg;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Invalid or missing gender field.');
  }

  return gender;
};

const parseOccupation = (arg: unknown): string => {
  if (!isString(arg)) {
    throw new Error('Invalid or missing occupation field.');
  }

  return arg;
};

// Example data to test this function:
// {
//   "entry": {
//       "description": "test",
//       "date": "2024-08-16",
//       "type": "HealthCheck", // Change this field to any of the 3 types, and dont forget to add/remove additional fields!
//       "specialist": "Joel F",
//       "healthCheckRating": 1
//   }
// }
const toAddEntry = (data: unknown): NewEntry => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid or missing data.');
  }

  if ("entry" in data) {
    const entry = data.entry as NewEntry;
    
    switch (entry.type) {
      case ('Hospital'):
        if ('description' in entry &&
          'date' in entry &&
          'specialist' in entry &&
          'discharge' in entry &&
          typeof entry.discharge === 'object' && entry.discharge !== null &&
          'date' in entry.discharge &&
          'criteria' in entry.discharge
        ) {
          const addEntry = {
            description: parseDescription(entry.description),
            date: parseEntryDate(entry.date),
            specialist: parseSpecialist(entry.specialist),
            discharge: {
              date: parseDischargeDate(entry.discharge.date),
              criteria: parseCriteria(entry.discharge.criteria)
            },
            type: entry.type
          };

          if ('diagnosisCodes' in entry) {
            return {
              ...addEntry,
              diagnosisCodes: parseCodes(entry.diagnosisCodes)
            };
          }

          return addEntry;
        } else {
          throw new Error('Missing fields for hospital entry.');
        }
      case ('OccupationalHealthcare'):
        console.log(entry.sickLeave);
        if ('description' in entry &&
          'date' in entry &&
          'specialist' in entry &&
          'employerName' in entry &&
          'sickLeave' in entry &&
          typeof entry.sickLeave === 'object' && entry.sickLeave !== null &&
          'startDate' in entry.sickLeave &&
          'endDate' in entry.sickLeave
        ) {
          const addEntry = {
            description: parseDescription(entry.description),
            date: parseEntryDate(entry.date),
            specialist: parseSpecialist(entry.specialist),
            employerName: parseEmployer(entry.employerName),
            sickLeave: {
              startDate: parseSickLeaveDates(entry.sickLeave.startDate),
              endDate: parseSickLeaveDates(entry.sickLeave.endDate)
            },
            type: entry.type
          };

          if ('diagnosisCodes' in entry) {
            return {
              ...addEntry,
              diagnosisCodes: parseCodes(entry.diagnosisCodes)
            };
          }

          return addEntry;
        } else {
          throw new Error(`Missing fields for occupational healthcare entry.`);
        }
      case ('HealthCheck'):
        if ('description' in entry &&
        'date' in entry &&
          'specialist' in entry &&
          'healthCheckRating' in entry
        ) {
          const addEntry = {
            description: parseDescription(entry.description),
            date: parseEntryDate(entry.date),
            specialist: parseSpecialist(entry.specialist),
            healthCheckRating: parseHealthCheck(entry.healthCheckRating),
            type: entry.type
          };

          if ('diagnosisCodes' in entry) {
            return {
              ...addEntry,
              diagnosisCodes: parseCodes(entry.diagnosisCodes)
            };
          }

          return addEntry;
        } else {
          throw new Error(`Missing fields for healthcheck entry.`);
        }
      default:
        throw new Error('Error: missing fields.');
    }
  } else {
    throw new Error('Error: missing "entry" field.');
  }
};

const parseDescription = (desc: unknown): string => {
  if (!isString(desc)) {
    throw new Error('Invalid or missing description field.');
  }

  return desc;
};

const parseEntryDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing entry date.');
  }

  return date;
};

const parseSpecialist = (arg: unknown): string => {
  if (!isString(arg)) {
    throw new Error('Invalid or missing specialist field.');
  }

  return arg;
};

const parseDischargeDate = (arg: unknown): string => {
  if (!isString(arg) || !isDate(arg)) {
    throw new Error('Invalid or missing discharge date.');
  }

  return arg;
};

const parseCriteria = (arg: unknown): string => {
  if (!isString(arg)) {
    throw new Error('Invalid or missing criteria field on discharge.');
  }

  return arg;
};

const parseCodes = (object: unknown): Array<DiagnoseData['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseData['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseData['code']>;
};

const parseEmployer = (arg: unknown): string => {
  if (!isString(arg)) {
    throw new Error('Invalid or missing employer field.');
  }

  return arg;
};

const parseSickLeaveDates = (arg: unknown): string => {
  if (!isString(arg)) {
    throw new Error('Invalid or missing startDate field on sickLeave object.');
  }

  return arg;
};

const isHealthCheck = (arg: number): arg is HealthCheckRating => {
  const vals = Object.values(HealthCheckRating).filter(value => typeof value === 'number');

  return typeof arg === 'number' && vals.includes(arg);
};

const parseHealthCheck = (arg: unknown): HealthCheckRating => {
  if (isNaN(Number(arg)) || !isHealthCheck(Number(arg))) {
    throw new Error('Invalid or missing healthCheckRating field.');
  }

  return arg as HealthCheckRating;
};

export default { toAddPatient, toAddEntry };