import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUsersData } from "../reducers/userDataReducer"

const User = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.userData)

  useEffect(() => {
    dispatch(setUsersData())
  }, [dispatch])

  if (!userData) {
    return <div>Loading data...</div>
  }

  const tableStyle = {
    borderCollapse: "collapse"
  }

  const cellStyle = {
    border: "1px solid black",
    padding: 8
  }

  return (
    <>
      <h1>Users</h1>

      <table style={tableStyle}>
        <thead>
          <tr>
            <td style={cellStyle}></td>
            <td style={cellStyle}>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {userData.map(data => (
            <tr key={data._id}>
              <td style={cellStyle}>{data.username}</td>
              <td style={cellStyle}>{data.blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default User