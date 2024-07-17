import { useQuery } from "@tanstack/react-query"
import userService from "../services/users"

const Users = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
    retry: 1
  })

  const users = result.data

  if (result.isLoading) {
    return <div>Loading user data...</div>
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
      <h2>Users</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}></th>
            <th style={cellStyle}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td style={cellStyle}>{user.username}</td>
              <td style={cellStyle}>{user.blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users