export type NonLatinDiagnose = Omit<DiagnoseData, 'latin'>;

export interface DiagnoseData {
  code: string,
  name: string,
  latin?: string
}

export type Gender = 'male' | 'female' | 'other';

export type NonSSNPatient = Omit<PatientData, 'ssn'>;

export interface PatientData {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn?: string,
  gender: Gender,
  occupation: string
}

export type NewPatient = Omit<PatientData, 'id'>;