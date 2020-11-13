import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { dateFormatter } from '../utils'
import { Dot } from '../Dot'
import { useHistory } from 'react-router-dom'

function renderDot(v){
  return <Dot color={v ? 'green' : 'red'}></Dot>
}

const useStyles = makeStyles({
  table: {
    maxWidth: 280,
  },
  container: {
    maxWidth: 280,
  }
})

export function PanicDetailsView({
  id,
  created_at,
  resolved_at,
  guard_id,
  user_name,
  user_surname,
  user_organization,
  guard_name,
  guard_surname,
  guard_organization,
}) {
  const classes = useStyles()

  const panicInfo = [
    { id: 'created_at',label:'Created at', value:  dateFormatter(created_at) },
    { id: 'resolved_at',label:'Resolved at', value:  dateFormatter(resolved_at) },
    { id: 'guard_id', label: 'Guard attached', value: renderDot(guard_id) },
  ]
  const userInfo = [
    { id: 'user_name', label:'Name', value: user_name },
    { id: 'user_surname', label:'Surname', value: user_surname },
    { id: 'user_organization',label:'Organization', value: user_organization },
  ]

  const tablesData = [
    {table: 'Panic', info: panicInfo},
    {table: 'Client', info: userInfo},
  ]

  if(guard_id) {
    const guardInfo = [
      { id: 'guard_name', label:'Name', value: guard_name },
      { id: 'guard_surname', label:'Surname', value: guard_surname },
      { id: 'guard_organization',label:'Organization', value: guard_organization },
    ]
    tablesData.push({table: 'Guard', info: guardInfo})
  }
  const history = useHistory()
  const onClick = useCallback(()=>{
    const { location: { pathname } } = history
    if(pathname !== `Panics/${id}`){
      history.push(`/Panics/${id}`)
    }
  })

  return (
    <TableContainer onClick={onClick} className={classes.container} component={Paper}>
      {tablesData.map(({table, info})=>(
        <Table size="small" key={table} className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>{table}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info.map((row) => (
              <TableRow  key={row.id}>
                <TableCell align="left">{row.label}</TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ))} 
    </TableContainer>
  )
}