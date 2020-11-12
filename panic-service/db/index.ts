import { Client, ClientConfig } from 'pg'
import { createUser,
  deleteUser, 
  getUserList, 
  updateUser, 
  updateGuardGeolocation, 
  getGuardsList, 
  updateGuardAvailability,
  createPanic,
  attachGuradToPanic,
  resolvePanic,
  getPanicsList,
  getPanic } from './queries'
 
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env
const dbOptions: ClientConfig = {
  host: PG_HOST,
  port: Number(PG_PORT),
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
}


async function connectToDb<T>(cb: (client: Client) => Promise<T>): Promise<T>{
  const client = new Client(dbOptions)
  await client.connect()
  try {
    const result = await cb(client)
    return result
  } catch (err) {
    console.error('Error during database request executing:', err)
    throw err
  } finally {
    client.end() // manual closing of connection
  }
}

export interface IUser {
  id?: string;
  name: string;
  surname?: string;
  organization?: string;
  user_role: 'admin'|'guard'|'client';
}

export type GeolocationType = {
  lat: string,
  lon: string,
}

export interface IGuard extends Omit<IUser, 'id'>{
  id: number;
  user_id: string;
  available: boolean;
  geolocation: GeolocationType;
}

export interface IPanic {
  id?: string;
  user_id: string;
  guard_id?: number;
  geolocation: GeolocationType;
  created_at?: string;
  resolved_at?: string;
}

class DB {
  createUser (user: IUser) {
    return connectToDb(async (client: Client): Promise<IUser>=>{
      const dbResponse = await client.query(...createUser(user))
      return dbResponse.rows[0]
    })
  }

  deleteUser (user: Required<IUser>  & {id: string}):Promise<IUser>;
  deleteUser (userid: string):Promise<IUser>;
  deleteUser(param: Required<IUser> | string) {
    const id: string = typeof param === 'string' ? param : param.id
    return connectToDb(async (client: Client): Promise<IUser> =>{
      const dbResponse = await client.query(...deleteUser(id))
      return dbResponse.rows[0]
    })
  }

  updateUser(user: Partial<IUser> & {id: string}) {
    return connectToDb(async (client: Client): Promise<IUser> =>{
      const dbResponse = await client.query(...updateUser(user))
      return dbResponse.rows[0]
    })
  }

  getUsersList(userProperties?: Partial<IUser>){
    return connectToDb(async (client: Client): Promise<IUser[]> =>{
      const dbResponse = await client.query(...getUserList(userProperties))
      return dbResponse.rows
    })
  }

  getGuardsList(properties?: Omit<Partial<IGuard>, 'geollocation'>){
    return connectToDb(async (client: Client): Promise<IGuard[]> =>{
      const dbResponse = await client.query(...getGuardsList(properties))
      return dbResponse.rows
    })
  }

  updateGuardGeolocation(properties: Required<Pick<IGuard, 'id'|'geolocation'>>){
    return connectToDb(async (client: Client): Promise<IGuard> =>{
      const dbResponse = await client.query(...updateGuardGeolocation(properties))
      return dbResponse.rows[0]
    })
  }

  updateGuardAvailability(properties: Required<Pick<IGuard, 'id'|'available'>>){
    return connectToDb(async (client: Client): Promise<IGuard> =>{
      const dbResponse = await client.query(...updateGuardAvailability(properties))
      return dbResponse.rows[0]
    })
  }

  createPanic(properties: Required<Pick<IPanic, 'user_id'|'geolocation'>>){
    return connectToDb(async (client: Client): Promise<IPanic> =>{
      const dbResponse = await client.query(...createPanic(properties))
      return dbResponse.rows[0]
    })
  }

  attachGuradToPanic(properties: Required<Pick<IPanic, 'id'|'guard_id'>>){
    return connectToDb(async (client: Client): Promise<IPanic> =>{
      const dbResponse = await client.query(...attachGuradToPanic(properties))
      return dbResponse.rows[0]
    })
  }

  resolvePanic(panicId: string){
    return connectToDb(async (client: Client): Promise<IPanic> =>{
      const dbResponse = await client.query(...resolvePanic(panicId))
      return dbResponse.rows[0]
    })
  }

  getPanicsList(properties?: Partial<IPanic>){
    return connectToDb(async (client: Client): Promise<IPanic[]> =>{
      const dbResponse = await client.query(...getPanicsList(properties))
      return dbResponse.rows
    })
  }

  getPanic(panicId: string){
    return connectToDb(async (client: Client): Promise<IPanic> =>{
      const dbResponse = await client.query(...getPanic(panicId))
      return dbResponse.rows[0]
    })
  }
}

export default new DB()