import React, { useEffect, useState } from 'react'
import { useApi, TableComponent, Dot, useSocket } from '../../components'
import { GUARD_ACTIONS, USER_ACTIONS } from '../../constansts/socketActions'

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

function createRow({id, name, surname, organization, available, user_id}) {
  return [id, name, surname, organization, available, user_id]
}

export function Guards() {
  const api = useApi()
  const [data, setData] = useState(null)
  const { subscribe } = useSocket()
  useEffect(()=>{
    return subscribe([...USER_ACTIONS, ...GUARD_ACTIONS],
      ({ user_role }={})=> {
        (user_role && user_role!=='guard')
          || api.getGuardsList().then(r=>setData(r))
      },
      true)
  },[])
  return <div className={style.container}>
    {data && <TableComponent 
      columns={column}
      rows={data.map(i=>createRow(i))}
      baseRoute={'User/guard'}
    />}
  </div>
}
