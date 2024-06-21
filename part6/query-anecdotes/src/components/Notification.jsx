import { useNotifValue } from "../context/NotifContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notifValue = useNotifValue()

  return notifValue !== '' ? (
    <div style={style}>
        <p>{notifValue}</p>
    </div>
  ) : (
    <>
    </>
  )
}

export default Notification
