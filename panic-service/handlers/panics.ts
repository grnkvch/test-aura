import { APIGatewayProxyHandler } from 'aws-lambda'

import { Panic } from '../db/models/Panic'
import { catchError, response } from '../utils'
import { addWSNotif } from '../utils/addWSNotif'

export const getPanic: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new Panic(event).getPanic()
  if(item?.error) return response(item?.error, 400)
  if(!item) return response('Such panic not found', 404)
  return response(item)
})
export const createPanic: APIGatewayProxyHandler = addWSNotif(
  'new_panic',
  catchError(async (event) => {
    const item = await new Panic(event).createPanic()
    if(item?.error) return response(item?.error, 400)
    if(!item) return response('Such panic not found', 404)
    return response(item, 201)
  }))
export const attachGurad: APIGatewayProxyHandler = addWSNotif(
  'guard_attached',
  catchError(async (event) => {
    const item = await new Panic(event).attachGuradToPanic()
    if(item?.error) return response(item?.error, 400)
    if(!item) return response('Such panic not found', 404)
    return response(item)
  }))
export const resolve: APIGatewayProxyHandler = addWSNotif(
  'panic_resolved',
  catchError(async (event) => {
    const item = await new Panic(event).resolvePanic()
    if(item?.error) return response(item?.error, 400)
    if(!item) return response('Such panic not found', 404)
    return response(item)
  }))
export const getPanicsList: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new Panic(event).getPanicsList()
  if(item?.error) return response(item?.error, 400)
  return response(item)
})