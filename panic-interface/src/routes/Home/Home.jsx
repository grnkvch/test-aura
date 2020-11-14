import React, { useEffect } from 'react'
import { Map, useSocketSubscribsion } from '../../components'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(() =>({
  container: {
    height: '100%'
  },
}))

export function Home() {
  const classes = useStyles()
  useSocketSubscribsion(['new_panic', 'new_user'], (a, k)=>console.log(k))
  return <div className={classes.container}>
    <Map />
  </div>
}

