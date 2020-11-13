import React, {useCallback, useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {UserSchema} from '../../models'
import {Formik, Field} from 'formik'
import {TextField} from 'formik-material-ui'

import {PaperLayout} from '../PaperLayout'
import Typography from '@material-ui/core/Typography'
import { useApi } from '../ApiProvider'
import { useHistory } from 'react-router-dom'
import { HandleError } from '../HandleError'

const Form = (props) => {
  const {
    values,
    dirty,
    isSubmitting,
    isValid,
    handleSubmit,
    onCancel,
    onDelete,
  } = props

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={2}>
        <Grid item container xs={12} justify="flex-end">
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={onDelete}
            disabled={!values.id}
          >
            Delete user
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            name="name"
            label="Name"
            fullWidth
            autoComplete="off"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            name="surname"
            label="surname"
            fullWidth
            autoComplete="off"
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            name="organization"
            label="Organization"
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            name="user_role"
            label="Role"
            fullWidth
            autoComplete="off"
            disabled
          />
        </Grid>
        <Grid item container xs={12} justify="flex-end">
          <Button
            type="button"
            color="primary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!dirty || isSubmitting || !isValid}
          >
            Save user
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

const emptyValues = (role)=>{
  const e = UserSchema.cast()
  e.user_role = role
  return e
}

export function UserForm({ userId, title, role }) {
  const api = useApi()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const history = useHistory()

  const onSubmit = useCallback((values, actions) => {
    const formattedValues = UserSchema.cast(values)
    const userToSave = userId ? {...UserSchema.cast(formattedValues), id: userId} : formattedValues
    const method = userId ? 'updateUser' : 'createUser'
    api[method](userId, userToSave)
      .then((r)=>{
        setUser(null)
        if(!userId) history.push(`Users/${r.id}`)
        actions.setSubmitting(false)
      })
      .catch((e)=>{
        setError(e.response.status)
      })
  }, [userId])

  const onDelete=useCallback(()=>{
    api.deleteUser(userId)
      .then(()=> history.goBack())
      .catch((e)=>{
        setError(e.response.status)
      })
  })
  
  const onCancel=useCallback(()=>history.goBack())

  useEffect(() => {
    if(!userId) {
      setIsLoading(false)
      return
    }
    if(!user) api.getUser(userId)
      .then(r => {
        setUser(r)
        setIsLoading(false)
      })
      .catch((e)=>{
        setError(e.response.status)
        setIsLoading(false)
      })
  }, [userId, user])

  if (isLoading) return <p>loading...</p>

  return (
    error ? <HandleError status={error} /> :
      <PaperLayout>
        <Typography component="h1" variant="h4" align="center">
          {title}
        </Typography>
        <Formik
          initialValues={user || emptyValues(role)}
          validationSchema={UserSchema}
          onSubmit={onSubmit}
        >
          {(props) => <Form 
            {...props} 
            onCancel={onCancel} 
            onDelete={onDelete} 
          />}
        </Formik>
      </PaperLayout>
  )
}