
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HandleError, useApi } from '../../components'
import { parseCoordinates } from '../../components/utils'
import { PanicDetailsView } from '../../components'
import ReactMapboxGl, { Marker, ZoomControl } from 'react-mapbox-gl'
import style from './PanicsDetails.module.css'
import apiKeys from '../../constansts/apiKeys'
import WarningIcon from '@material-ui/icons/Warning'


const MapComponent = ReactMapboxGl({ accessToken: apiKeys.MAPBOX_ACCESS_TOKEN })

export function PanicsDetails() {
  const { id } = useParams()
  const api = useApi()
  const [info, setInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const { lon, lat }= useMemo(()=> info ? parseCoordinates(info.gelocation) : {}, [info])

  if (isLoading) return <p>loading...</p>
  return (
    <div className={style.container}>
      {error 
        ? <HandleError status={error} />
        : <>
          <PanicDetailsView {...info}></PanicDetailsView>
          <MapComponent
            style="mapbox://styles/mapbox/streets-v9"
            center={[lon,lat]}
            zoom = {[12]}
            containerStyle={{ flex: '1 0 auto' }}
          >
            <ZoomControl /> 
            <Marker key={''+lon+lat} coordinates={[lon,lat]}>
              <WarningIcon htmlColor={info.resolved_at ? '#2EE454' : '#E4323F'}></WarningIcon>
            </Marker>)
          </MapComponent>
        </>}
    </div>)
}
