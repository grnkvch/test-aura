import db, { IConnetionId } from '../db'
import { responseType } from './response'

const AWS = require('aws-sdk')

export function addWSNotif(message: string, cb: (...any)=>Promise<responseType>){
  return async function (...args: any[]):Promise<responseType> {
    
    const value = await cb(...args)
    if(value.statusCode < 200 || value.statusCode > 299) return value

    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: process.env.SOCKET_END_POINT
    })
    let connectionsIds: IConnetionId[]
    try{
      connectionsIds = await db.getConnection()
    }catch(error){
      console.error('Socket error', error)
    } 

    const postCalls = connectionsIds.map(async ({ connection_id }) => {
      try {
        await apigwManagementApi.postToConnection({ ConnectionId: connection_id, Data: message }).promise()
      } catch (e) {
        if (e.statusCode === 410) {
          console.log(`Found stale connection, deleting ${connection_id}`)
          await db.deleteConnection(connection_id)
        } else {
          throw e
        }
      }
    })
      
    const notifResult = await Promise.allSettled(postCalls)
    notifResult.forEach(({status, reason}) => status === 'rejected' && console.error('Socket error', reason))

    return value
  } 
}
  
