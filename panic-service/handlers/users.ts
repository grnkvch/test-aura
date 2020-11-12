import { APIGatewayProxyHandler } from 'aws-lambda'

import { User } from '../db/models/User'
import { catchError, response } from '../utils'

export const createUser: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new User(event).createUser()
  if(item?.error) return response(item?.error, 400)

  return response(item, 201)
})
export const deleteUser: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new User(event).deleteUser()
  if(item?.error) return response(item?.error, 400)
  if(!item) return response('Such user not found', 404)
  return response(item)
})
export const updateUser: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new User(event).updateUser()
  if(item?.error) return response(item?.error, 400)
  if(!item) return response('Such user not found', 404)
  return response(item)
})
export const getUsersList: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new User(event).getUsersList()
  if(item?.error) return response(item?.error, 400)
  return response(item)
})
export const getUser: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new User(event).getUser()
  if(item?.error) return response(item?.error, 400)
  if(!item[0]) return response('Such user not found', 404)
  return response(item[0])
})