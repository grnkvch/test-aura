import React, { useEffect, useState } from 'react'
import { useApi, TableComponent, Dot } from '../../components'
import { dateFormatter } from '../../components/utils'

import style from './Panics.module.css'

function renderAvalaible(v){
  return <Dot color={v ? 'green' : 'red'}></Dot>
}

const column = [
  { id: 'N', label: '№',  },
  { id: 'created_at', label: 'Created at', format: dateFormatter  },
  { id: 'guard_id', label: 'Guard attached', format: renderAvalaible, align: 'center' },
  { id: 'resolved_at', label: 'Resolved at', format: dateFormatter },
]

function createRow({n, created_at, guard_id, resolved_at, id}) {
  return [n, created_at, guard_id, resolved_at, id]
}

export function Panics() {
  const api = useApi()
  const [data, setData] = useState(null)
  useEffect(()=>{
    api.getPanicsList().then(r=>setData(r))
  },[])
  return <div className={style.container}>
    {data && <TableComponent 
      columns={column}
      rows={data.map((i, index)=>createRow({n:index+1, ...i}))}
      baseRoute={'Panics'}
    />}
  </div>
}
