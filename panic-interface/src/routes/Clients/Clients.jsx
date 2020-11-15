import React, { useEffect, useState } from 'react'
import { useApi, TableComponent, useSocket } from '../../components'
import { USER_ACTIONS } from '../../constansts/socketActions'

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

  const { subscribe } = useSocket()
  
  useEffect(()=>{
    return subscribe(USER_ACTIONS,
      ({ user_role }={})=> (user_role && user_role!=='client')
      || api.getClientsList().then(r=>setData(r)),
      true)
  },[])
  return <div className={style.container}>
    {data && <TableComponent 
      columns={column}
      rows={data.map((i, index)=>createRow({n:index+1, ...i}))}
      baseRoute={'User/client'}
    />}
  </div>
}
