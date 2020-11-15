import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import {Link} from 'react-router-dom'
import { AppDrawer } from '../AppDrawer'
import { OnlineIndicator } from '../OnlineIndicator/OnlineIndicator'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    homeLink: {
      color: 'white',
      textDecoration: 'none'
    }
  }),
)

export function Header() {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link className={classes.homeLink} to="/Home">Interface</Link>
          {' '}
          <OnlineIndicator></OnlineIndicator>
        </Typography>
        <div>
          <AppDrawer />
        </div>
      </Toolbar>
    </AppBar>
  )
}