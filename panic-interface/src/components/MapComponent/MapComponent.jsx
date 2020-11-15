import React, { useCallback, useEffect, useRef } from 'react'
import ReactMapboxGl from 'react-mapbox-gl'

import apiKeys from '../../constansts/apiKeys'

const MapBox = ReactMapboxGl({ accessToken: apiKeys.MAPBOX_ACCESS_TOKEN })

export function MapComponent({center, zoom, onMove, children, ...props}) {
  const mapViewport = useRef({ center, zoom })
  const onMapMove = useCallback((...args) => {
    const [onMoveEvent] = args
    const { lng, lat } = onMoveEvent.getCenter()
    const zoom =onMoveEvent.getZoom()
    mapViewport.current.center = [lng, lat]
    mapViewport.current.zoom = [zoom]
    return onMove && onMove(args)
  }, [onMove])

  useEffect(()=>{
    mapViewport.current.center = center
    mapViewport.current.zoom = zoom
  }, [zoom[0], center[0], center[1]])

  return (<MapBox
    {...props}
    {...mapViewport.current}
    onMove={onMapMove}
  >
    {children}
  </MapBox>)
}
