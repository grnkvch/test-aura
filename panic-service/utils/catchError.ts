import { response, responseType } from './response'

export function catchError<T>(cb: (...any)=>Promise<T & responseType>){
  return async function (...args: any[]):Promise<T> {
    try {
      const value = await cb(...args)
      return value
    } catch(error){
      console.error(error)
      return response(error, 500)
    } finally {
      console.log(args[0])
    }
  } 
}