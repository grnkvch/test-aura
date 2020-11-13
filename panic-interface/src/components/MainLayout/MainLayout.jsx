import React from 'react'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import { Header } from '../Header'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Interface
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) =>({
  container: {
    paddingBottom: theme.spacing(8),
  },
  main: {
    display: 'flex',
    flex: '1 0 auto',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

export const MainLayout = ({children}) => {
  const classes = useStyles()

  return (
    <>
      <Header/>
      <main className={classes.main}>
        <Container className={classes.container} maxWidth="md">
          {children}
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Thank you for using our service!
        </Typography>
        <Copyright/>
      </footer>
    </>
  )
}
