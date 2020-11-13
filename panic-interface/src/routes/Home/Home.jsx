import React from 'react'
import { Map } from '../../components'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(() =>({
  container: {
    height: '100%'
  },
}))

export function Home() {
  const classes = useStyles()
  return <div className={classes.container}>
    <Map />
  </div>
}

