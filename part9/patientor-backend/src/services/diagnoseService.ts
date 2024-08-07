import data from "../../data/diagnoses";
import { DiagnoseData, NonLatinDiagnose } from "../../types";

const getDiagnoses = (): DiagnoseData[] => {
  return data;
};

const getNonLatinDiagnoses = (): NonLatinDiagnose[] => {
  return data.map(({ code, name }) => ({
    code,
    name
  }));
};

export default { getDiagnoses, getNonLatinDiagnoses };