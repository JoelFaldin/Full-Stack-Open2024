export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Diagnosis['code']>
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating
}

interface sickLeave {
  startDate: string,
  endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: sickLeave,
}

interface Discharge {
  date: string,
  criteria: string
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: Discharge
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export interface DescInterface {
  code: string,
  name: string,
  lating: string
}