import { APIGatewayProxyHandler } from 'aws-lambda'

import { Panic } from '../db/models/Panic'
import { catchError, response } from '../utils'

export const getPanic: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new Panic(event).getPanic()
  if(item?.error) return response(item?.error, 400)
  if(!item) return response('Such panic not found', 404)
  return response(item)
})
export const createPanic: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new Panic(event).createPanic()
  if(item?.error) return response(item?.error, 400)
  if(!item) return response('Such panic not found', 404)
  return response(item, 201)
})
export const attachGurad: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new Panic(event).attachGuradToPanic()
  if(item?.error) return response(item?.error, 400)
  if(!item) return response('Such panic not found', 404)
  return response(item)
})
export const resolve: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new Panic(event).resolvePanic()
  if(item?.error) return response(item?.error, 400)
  if(!item) return response('Such panic not found', 404)
  return response(item)
})
export const getPanicsList: APIGatewayProxyHandler = catchError(async (event) => {
  const item = await new Panic(event).getPanicsList()
  if(item?.error) return response(item?.error, 400)
  return response(item)
})