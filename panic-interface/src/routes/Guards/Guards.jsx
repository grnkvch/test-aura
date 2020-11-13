import React, { useEffect, useState } from 'react'
import { useApi, TableComponent, Dot } from '../../components'

import style from './Guards.module.css'

function renderAvalaible(v){
  return <Dot color={v ? 'green' : 'red'}></Dot>
}

const column = [
  { id: 'id', label: 'id',  },
  { id: 'name', label: 'Name' },
  { id: 'surname', label: 'Surname' },
  { id: 'organization', label: 'Organization' },
  { id: 'available',
    label: 'Avalaible',
    align: 'center',
    format: renderAvalaible 
  },
]

function createRow({id, name, surname, organization, available}) {
  return [id, name, surname, organization, available]
}

export function Guards() {
  const api = useApi()
  const [data, setData] = useState(null)
  useEffect(()=>{
    api.getGuardsList().then(r=>setData(r))
  },[])
  return <div className={style.container}>
    {data && <TableComponent 
      columns={column}
      rows={data.map(i=>createRow(i))}
    />}
  </div>
}
