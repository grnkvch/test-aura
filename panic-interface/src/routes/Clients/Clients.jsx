import React, { useEffect, useState } from 'react'
import { useApi, TableComponent } from '../../components'

import style from './Clients.module.css'

const column = [
  { id: 'N', label: '№',  },
  { id: 'name', label: 'Name' },
  { id: 'surname', label: 'Surname' },
  { id: 'organization', label: 'Organization' },
]
// last elemetn should be unique id to support routing(optional)
function createRow({n, name, surname, organization, id}) {
  return [n, name, surname, organization, id]
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
      baseRoute={'User/client'}
    />}
  </div>
}
