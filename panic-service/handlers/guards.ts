import { APIGatewayProxyHandler } from 'aws-lambda'

import { Guard } from '../db/models/Guard'
import { catchError, response } from '../utils'
import { addWSNotif } from '../utils/addWSNotif'

export const updateAvailability: APIGatewayProxyHandler = addWSNotif(
  'guard_availability_update',
  catchError(async (event) => {
    const item = await new Guard(event).updateGuardAvailability()
    if(item?.error) return response(item?.error, 400)
    if(!item) return response('Such guard not found', 404)
    return response(item)
  }))
export const updateGeolocation: APIGatewayProxyHandler =  addWSNotif(
  'guard_geolocation_update',
  catchError(async (event) => {
    const item = await new Guard(event).updateGuardGeolocation()
    if(item?.error) return response(item?.error, 400)
    if(!item) return response('Such guard not found', 404)
    return response(item)
  }))
export const getGuardsList: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new Guard(event).getGuardsList()
  if(item?.error) return response(item?.error, 400)
  
  return response(item)
})
export const getGuard: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new Guard(event).getGuard()
  if(item?.error) return response(item?.error, 400)
  if(!item[0]) return response('Such guard not found', 404)
  return response(item[0])
})