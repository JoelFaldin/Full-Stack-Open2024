import { Gender, NewPatient } from "./types";

const toAddPatient = (data: unknown): NewPatient => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid or missing data.');
  }

  if ('name' in data && 'dateOfBirth' in data && 'ssn' in data && 'gender' in data && 'occupation' in data) {
    const newPatient = {
      name: parseName(data.name),
      dateOfBirth: parseDate(data.dateOfBirth),
      ssn: parseSSN(data.ssn),
      gender: parseGender(data.gender),
      occupation: parseOccupation(data.occupation)
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
  console.log(arg);
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

export default toAddPatient;