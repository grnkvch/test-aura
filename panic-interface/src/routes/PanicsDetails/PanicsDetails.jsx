
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HandleError, MapComponent, useApi, useSocketSubscribsion } from '../../components'
import { parseCoordinates } from '../../components/utils'
import { PanicDetailsView } from '../../components'
import { Cluster, Marker, Popup, ZoomControl } from 'react-mapbox-gl'
import style from './PanicsDetails.module.css'

import SecurityIcon from '@material-ui/icons/Security'
import WarningIcon from '@material-ui/icons/Warning'
import { GUARD_ACTIONS, PANIC_ACTIONS, USER_ACTIONS } from '../../constansts/socketActions'
import { createClusterMarker } from '../../components/Map/Map'
import { Button, Grid } from '@material-ui/core'

function shouldUpdatePanic(data, info){
  const { user_id, id, guard_id, guard_user_id } = info

  return !(id !== data.id 
        && data.id !== user_id 
        && data.id !== guard_id 
        && data.user_id !== guard_user_id)  
}

const guardCluster = createClusterMarker(SecurityIcon)

export function PanicsDetails() {
  const { id } = useParams()
  const api = useApi()
  const [info, setInfo] = useState(null)
  const [guards, setGuards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [popup, setPopup] = useState(null)

  const { lon, lat }= useMemo(()=> info ? parseCoordinates(info.gelocation) : {}, [info])

  useEffect(() => {
    api.getPanic(id)
      .then(r => {
        setInfo(r)
        setIsLoading(false)
      })
      .catch((e)=>{
        setError(e.response.status)
        setIsLoading(false)
      })
  }, [id])

  useEffect(() => {
    if(info){
      if(!info.guard_id){
        api.getAvailabileGuards().then(r=>setGuards(r))
      } else {
        api.getGuard(info.guard_id).then(r=>setGuards([r]))
      }
    }
      
  }, [info])

  useSocketSubscribsion([...USER_ACTIONS, ...GUARD_ACTIONS, ...PANIC_ACTIONS],
    (data)=>{
      if(shouldUpdatePanic(data, info)) {
        api.getPanic(id).then(r => setInfo(r))
          .catch((e)=>console.log(e))
      }
    }, [info])

  const attachGuard = async (panicId, guardId) =>{
    await api.attachGurad(panicId, guardId)
    await api.updateAvailability(guardId, false)
  }
  
  const  onAttachClick = useCallback(async ()=>{
    try{
      const [closestGuard] = await api.getClosestGuards(lon, lat)
      if(closestGuard){
        await attachGuard(info.id, closestGuard.id)
      }
    }catch(e){
      return  
    }
  }, [lon, lat, info?.id])

  const  onResolveClick = useCallback(async ()=>{
    try{
      await api.resolvePanic(info.id)
    }catch(e){
      return  
    }
  }, [info?.id])

 
  const  markerClickHandler = useCallback(({guard_id, lon, lat})=>{
    setPopup({guard_id, coords:[lon, lat]})
  }, [])

  const onCofirm = useCallback(async(guard_id)=>{
    try{
      setPopup(null)
      await attachGuard(info.id, guard_id)
    }catch(e){
      return  
    }
  }, [popup])


  console.log(popup)
  if (isLoading) return <p>loading...</p>
  return (
    <div className={style.container}>
      {error 
        ? <HandleError status={error} />
        : <>
          <div>
            <PanicDetailsView {...info}></PanicDetailsView>
            <div style={{paddingTop: 10, maxWidth: 280, }}>
              <Grid container spacing={1} xs={12}>
                <Grid item container xs={6}>
                  {info && !info.resolved_at && <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={onResolveClick}
                  >
                    Resolve panic
                  </Button>}
                </Grid>
                <Grid item container xs={6} justify="flex-end">
                  {info && !info.guard_id && <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={onAttachClick}
                  >
                    Attach closest
                  </Button>}
                </Grid>
              </Grid>
            </div>
          </div>
          <MapComponent
            style="mapbox://styles/mapbox/streets-v9"
            center={[lon,lat]}
            zoom = {[12]}
            containerStyle={{ flex: '1 0 auto' }}
            onClick={()=>setPopup(null)}
          >
            <ZoomControl /> 
            <Marker key={''+lon+lat} coordinates={[lon,lat]}>
              <WarningIcon htmlColor={info.resolved_at ? '#2EE454' : '#E4323F'}></WarningIcon>
            </Marker>
            <Cluster zoomOnClickPadding={100} zoomOnClick ClusterMarkerFactory={guardCluster}>  
              {guards.map((item)=> {
                const {lon, lat}= parseCoordinates(item.gelocation)

                return(
                  <Marker 
                    onClick={()=>markerClickHandler({guard_id: item.id, lon, lat})}
                    key={''+lon+lat} coordinates={[lon,lat]}>
                    <SecurityIcon htmlColor={item.available ? '#328EE4' : '#E4323F'}></SecurityIcon>
                  </Marker>)})}
            </Cluster>  
            {popup && <Popup
              coordinates={popup.coords}
              offset={{
                'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
              }}>
              {<div><Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={()=>onCofirm(popup.guard_id)}
              >
                    Attach this guard to panic?
              </Button></div>}
            </Popup>}
          </MapComponent>
        </>}
    </div>)
}
