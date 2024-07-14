import { useSelector } from "react-redux"

const Notification = () => {
  const notif = useSelector(state => state.notification)

  const styles = {
    color: "green",
    backgroundColor: "rgb(140, 235, 164)",
    fontSize: 20,
    borderStyle: "solid",
    padding: 5,
    marginBottom: 10,
    width: "fit-content",
    borderRadius: 5
  }

  return notif ? (
    <div style={styles}>
      {notif}
    </div>
  ) : (
    <>
    </>
  )
}

export default Notification