import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorNotifInterface {
  error: string
}

const ErrorNotif = ({ error }: ErrorNotifInterface) => {
  return (
    <div style={{ backgroundColor: "#ffabab", padding: "10px 0 10px 5px", margin: "10px 0" }}>
      <ErrorOutlineIcon style={{ verticalAlign: "middle" }} />
      <span> {error}</span>
    </div>
  );
};

export default ErrorNotif;