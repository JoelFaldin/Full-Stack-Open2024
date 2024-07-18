import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const ErrorNotification = () => {
  const errorNotif = useSelector(state => state.errNotification)

  return errorNotif ? (
    <Alert severity="error">
      {errorNotif}
    </Alert>
  ) : (
    <>
    </>
  )
}

export default ErrorNotification