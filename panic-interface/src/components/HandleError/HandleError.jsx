import React from 'react'
import { Typography } from '@material-ui/core'


export const HandleError = ({status})=>{
  let message
  switch (status) {
  case 400:
    message = '400\nBad request'
    break
  case 404:
    message = '404\nNot found'
    break
  default: 
    message = 'Somthing went wrong'
  }
  return (<Typography component="h1" variant="h4" align="center">
    {message}
  </Typography>)
}