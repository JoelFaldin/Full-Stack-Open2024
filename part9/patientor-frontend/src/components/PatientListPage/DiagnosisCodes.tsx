interface DiagnosisInterface {
  codes: string[]
}

const DiagnosisCodes = ({ codes }: DiagnosisInterface) => {
  return (
    <ul>
      {
        codes.map(code => (
          <li key={code}>{code}</li>
        ))
      }
    </ul>
  );
};

export default DiagnosisCodes;