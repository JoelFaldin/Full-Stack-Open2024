import { useSelector } from "react-redux";

const ErrorNotification = () => {
  const errorNotif = useSelector(state => state.errNotification)

  const styles = {
    color: "red",
    backgroundColor: "rgb(235, 140, 140)",
    fontSize: 20,
    borderStyle: "solid",
    padding: 5,
    marginBottom: 10,
    width: "fit-content",
    borderRadius: 5
  }

  return errorNotif ? (
    <div style={styles}>
      {errorNotif}
    </div>
  ) : (
    <>
    </>
  )
}

export default ErrorNotification