import { useEffect, useState } from "react";

import diagnosisService from "../../services/diagnosis";
import { DescInterface } from "../../types";

interface DiagnosisInterface {
  code: string
}

const DiagnosisCodes = ({ code }: DiagnosisInterface) => {
  const [desc, setDesc] = useState<DescInterface[]>([]);

  useEffect(() => {
    const getDesc = async () => {
      const descInfo = await diagnosisService.getDescInfo();
      setDesc(descInfo);
    };

    getDesc();
  }, []);
  
  const diagnosisData = desc?.find(diag => diag.code === code);

  return (
    <ul>
      <li>{code}: {diagnosisData?.name}</li>
    </ul>
  );
};

export default DiagnosisCodes;