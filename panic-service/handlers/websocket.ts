import { APIGatewayProxyHandler } from 'aws-lambda'
import db from '../db'
import { catchError, response } from '../utils'

export const connect: APIGatewayProxyHandler = catchError(async (event) => {
  await db.addConnection(event.requestContext.connectionId)
  return response('Connected.')
})

export const disconcect: APIGatewayProxyHandler = catchError(async (event) => {  
  await db.deleteConnection(event.requestContext.connectionId)
  return response('Disconnected.')
})
