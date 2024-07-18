import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"

import { setUsersData } from "../reducers/userDataReducer"

const User = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.userData)

  useEffect(() => {
    dispatch(setUsersData())
  }, [dispatch])

  if (!userData) {
    return <Typography>Loading data...</Typography>
  }

  return (
    <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
      <Typography variant="h5">Users</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
            {userData.map(data => (
              <TableRow key={data._id}>
                <TableCell>
                  <Link to={`/users/${data._id}`}>{data.username}</Link>
                </TableCell>
                <TableCell>{data.blogs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default User