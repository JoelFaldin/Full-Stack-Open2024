export type NonLatinDiagnose = Omit<DiagnoseData, 'latin'>;

export interface DiagnoseData {
  code: string,
  name: string,
  latin?: string
}