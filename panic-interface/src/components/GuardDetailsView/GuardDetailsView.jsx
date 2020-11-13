import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Dot } from '../Dot'

function renderDot(v){
  return <Dot color={v ? 'green' : 'red'}></Dot>
}

const useStyles = makeStyles({
  table: {
    maxWidth: 280,
  },
})

export function GuardDetailsView({
  name, 
  surname,  
  organization, 
  available,
}) {
  const classes = useStyles()

  const guardInfo = [
    { id: 'guard_name', label:'Name', value: name },
    { id: 'guard_surname', label:'Surname', value: surname },
    { id: 'guard_organization',label:'Organization', value: organization },
    { id: 'available',label:'Available', value: renderDot(available) },
  ]
  return (
    <TableContainer component={Paper}>
      <Table size="small" className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>Guard</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guardInfo.map((row) => (
            <TableRow  key={row.id}>
              <TableCell align="left">{row.label}</TableCell>
              <TableCell align="left">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}