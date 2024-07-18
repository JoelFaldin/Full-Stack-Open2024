import { Alert } from "@mui/material"
import { useSelector } from "react-redux"

const Notification = () => {
  const notif = useSelector(state => state.notification)

  return notif ? (
    <Alert severity="success">
      {notif}
    </Alert>
  ) : (
    <>
    </>
  )
}

export default Notification