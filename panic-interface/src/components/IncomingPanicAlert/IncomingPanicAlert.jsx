import React, { useCallback, useState } from 'react'

import { Alert, AlertTitle } from '@material-ui/lab'
import {  makeStyles, withStyles } from '@material-ui/core'
import { useSocketSubscribsion } from '../WsListenerProvider'
import { Link } from 'react-router-dom'
import { dateFormatter } from '../utils'

const useStyles = makeStyles(() =>({
  container: { 
    position: 'absolute',
    zIndex: 1000,
    bottom: 150,
    right: 0,
  },
}))

const StyledAlert = withStyles({
  root: {
    margin: '10px'
  },
})(Alert)

export function IncomingPanicAlert() {
  const classes = useStyles()
  const [panicAlerts, setPanicsAlert] = useState([])
  useSocketSubscribsion('new_panic', 
    (panic)=>setPanicsAlert([...panicAlerts, panic])
    ,[panicAlerts])

  const closeAlert = useCallback((idToClose)=>()=>{
    setPanicsAlert(panicAlerts.filter(({id})=>idToClose!==id))
  }, [panicAlerts])

  return (
    <div className={classes.container}>
      {panicAlerts.map(({ id, created_at })=>{
        const close=closeAlert(id)
        
        return (<StyledAlert onClose={close} key={id} severity="error">
          <AlertTitle>Incoming Panic</AlertTitle>
          Incoming panic alert — <Link 
            onClick={close} 
            to={`/Panics/${id}`}>
            <strong>check it out!</strong>
          </Link><br/>
          Received at {dateFormatter(created_at)}
        </StyledAlert>)
      })}
    </div>
    
  )
}
