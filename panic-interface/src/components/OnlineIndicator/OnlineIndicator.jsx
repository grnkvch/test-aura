import { withStyles, Badge, Typography } from '@material-ui/core'
import { useSocket } from '../WsListenerProvider'
import React from 'react'

const styledBy = (property) => (props) => props[property]

const StyledBadge = withStyles({
  badge: {
    backgroundColor: styledBy('color')
  },
})(Badge)

const StyledTypography =  withStyles({
  overline: {
    fontWeight: 'bold',
    position: 'relative',
    top: -7,
    color: styledBy('color')
  },
})(Typography)

export function OnlineIndicator() {
  const { connected } = useSocket()
  const color = connected ? 'green' : 'error'
  
  return (
    <StyledBadge variant="dot" color={color} sha>
      <StyledTypography variant="overline" color={color} align="center">
        Online
      </StyledTypography>
    </StyledBadge>
  )
}
