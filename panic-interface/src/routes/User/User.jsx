import React from 'react'
import { useParams } from 'react-router-dom'
import { UserForm } from '../../components'

import style from './User.module.css'

export function User() {
  const { id, role } = useParams()
  return <div className={style.container}>
    <UserForm userId={id} title={id ? `Edit ${role}` : `Create new ${role}` } role={role}></UserForm>
  </div>
}
