import React, { useEffect, useState } from 'react'
import { useApi, TableComponent } from '../../components'

import style from './Clients.module.css'

const column = [
  { id: 'N', label: '№',  },
  { id: 'name', label: 'Name' },
  { id: 'surname', label: 'Surname' },
  { id: 'organization', label: 'Organization' },
]

function createRow({n, name, surname, organization}) {
  return [n, name, surname, organization]
}

export function Clients() {
  const api = useApi()
  const [data, setData] = useState(null)
  useEffect(()=>{
    api.getClientsList().then(r=>setData(r))
  },[])
  return <div className={style.container}>
    {data && <TableComponent 
      columns={column}
      rows={data.map((i, index)=>createRow({n:index+1, ...i}))}
    />}
  </div>
}
