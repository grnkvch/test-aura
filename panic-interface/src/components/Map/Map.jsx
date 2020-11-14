import React, { useCallback, useEffect, useRef,  useState } from 'react'
import ReactMapboxGl, { Marker, ZoomControl, Popup, Cluster } from 'react-mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

import style from './Map.module.css'
import apiKeys from '../../constansts/apiKeys'
import { useApi } from '../ApiProvider'
import { parseCoordinates } from '../utils'

import SecurityIcon from '@material-ui/icons/Security'
import WarningIcon from '@material-ui/icons/Warning'
import { PanicDetailsView } from '../PanicDetailsView'
import { GuardDetailsView } from '../GuardDetailsView'
import { MapComponent } from '../MapComponent'

const createClusterMarker = (Icon)=> function ClusterMarker(coords, number) {
  return (
    <Marker key={coords.toString()} coordinates={coords} >
      <div>
        <Icon fontSize='large' htmlColor='#8b6092'/>
        <span className={style.count}>{number}</span>
      </div>
    </Marker>
  )}

const panicCluster = createClusterMarker(WarningIcon)
const guardCluster = createClusterMarker(SecurityIcon)

export const Map = function() {
  const api = useApi()
  const [panics, setPanics] = useState([])
  const [guards, setGuards] = useState([])
  const [popup, setPopup] = useState(null)
  const [info, setInfo] = useState(null)

  useEffect(()=>{
    api.getPanicsList().then(r=>setPanics(r))
    api.getGuardsList().then(r=>setGuards(r))
  }, [])

  const markerClickHandler = useCallback((item)=>{
    setInfo(null)
    const { lon, lat}= parseCoordinates(item.gelocation)
    setPopup([lon,lat])
    const method  = typeof item.id  === 'number' ? 'getGuard' : 'getPanic'
    api[method](item.id).then(r=>setInfo(r))
  },[])

  const mapOnClick = useCallback(()=>{
    setInfo(null)
    setPopup(null)
  }, [])

  return (<MapComponent
    style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
      height: '100%',
      width: '100%',
    }}
    center={[27, 53]}
    zoom={[7]}
    onClick={mapOnClick} 
  >
    <ZoomControl />
    <Cluster zoomOnClickPadding={100} zoomOnClick ClusterMarkerFactory={panicCluster}> 
      {panics.map((item)=> {
        const { lon, lat}= parseCoordinates(item.gelocation)
        return(
          <Marker onClick={()=>markerClickHandler(item)} key={''+lon+lat} coordinates={[lon,lat]}>
            <WarningIcon htmlColor={item.resolved_at ? '#2EE454' : '#E4323F'}></WarningIcon>
          </Marker>)})}
    </Cluster> 
    <Cluster zoomOnClickPadding={100} zoomOnClick ClusterMarkerFactory={guardCluster}>  
      {guards.map((item)=> {
        const { lon, lat}= parseCoordinates(item.gelocation)
        return(
          <Marker onClick={()=>markerClickHandler(item)} key={''+lon+lat} coordinates={[lon,lat]}>
            <SecurityIcon htmlColor={item.available ? '#328EE4' : '#E4323F'}></SecurityIcon>
          </Marker>)})}
    </Cluster>  
    {popup && <Popup
      coordinates={popup}
      offset={{
        'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
      }}>
      {info 
        ? info.created_at ? <PanicDetailsView {...info}/> : <GuardDetailsView {...info}/>
        : <div className={style.loader} />}
    </Popup>}    
  </MapComponent>
  )
}
