import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import SecurityIcon from '@material-ui/icons/Security'
import PersonIcon from '@material-ui/icons/Person'
import HomeIcon from '@material-ui/icons/Home'
import WarningIcon from '@material-ui/icons/Warning'

import {Link, useLocation} from 'react-router-dom'


const useStyles = makeStyles({
  list: {
    width: 250,
  },
})
   
const config = [
  {
    route: 'Home',
    icon: HomeIcon,
  },
  {
    route: 'Panics',
    icon: WarningIcon  
  },
  {route: 'Clients',
    icon: PersonIcon
  },
  {route: 'Guards',
    icon: SecurityIcon  
  },
]

function renderItem({ Icon, selected, route, navigate }){
  return( 
    <ListItem button selected={selected} onClick={navigate}>
      <ListItemIcon>{<Icon />}</ListItemIcon>
      <ListItemText primary={route} />
    </ListItem>
  )}

export function AppDrawer() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (open) => () => {
    setOpen(open)
  }
  const { pathname } = useLocation()
  return (
    <div>
      <Button variant={'outlined'} onClick={toggleDrawer(true)}>{'MENU'}</Button>
      <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        <div
          className={classes}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {config.map(({ route, icon }) => (
              <Link 
                key={route}  
                className={classes.homeLink} 
                to={`/${route}`}
                component={({navigate, href})=>{
                  return renderItem({
                    Icon: icon, 
                    selected: pathname === href, 
                    route,
                    navigate: ()=>navigate(href)
                  })
                }}>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  )
}