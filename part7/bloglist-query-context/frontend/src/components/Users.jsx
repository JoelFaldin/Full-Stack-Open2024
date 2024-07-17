import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import userService from "../services/users"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

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
      <Typography variant="h4">
        Users
      </Typography>

      <TableContainer>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell>
              </TableCell>
              <TableCell>
                blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell><Link to={`/users/${user._id}`}>{user.username}</Link></TableCell>
                <TableCell>{user.blogs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table >
      </TableContainer>
    </>
  )
}

export default Users