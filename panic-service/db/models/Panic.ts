import { APIGatewayProxyEvent } from 'aws-lambda'
import db, { GeolocationType, IPanic } from '..'
import { validateSchema } from '../../utils'

const Joi = require('joi')

const createSchema = Joi.object({
  user_id: Joi.string().required(),
  geolocation: Joi.object({
    lat: Joi.number().required(),
    lon: Joi.number().required()
  }).required(),
})
const attachGuradSchema = Joi.object({
  guard_id: Joi.number().required(),
})

const idSchema = Joi.string().guid().required()

export class Panic implements Partial<IPanic> {
    id: string;
    user_id: string;
    guard_id: number;
    geolocation: GeolocationType;
    created_at: string;
    resolved_at: string;
    body: Omit<IPanic, 'id'>;
    error: any;
    constructor(event: APIGatewayProxyEvent){
      const { id, body } = this.parseEvent(event)
      this.body = body
      if(id !== undefined){
        this.id = id
      }
    }
    parseEvent(event: APIGatewayProxyEvent){
      const { id } = event.pathParameters || {}
      const { body } = event
      let parsedBody: IPanic
      if(body){
        try {
          parsedBody = JSON.parse(body)
        } catch (error) {
          this.error = error
          return { id, body: parsedBody }
        }  
      }
      return { id, body: parsedBody }
    }
    getPanic(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(()=>db.getPanic(this.id), this.id, idSchema)
    }
    getPanicsList(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(()=>db.getPanicsList())
    }
    resolvePanic(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(()=>db.resolvePanic(this.id), this.id, idSchema)
    }
    attachGuradToPanic(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(
        ()=>validateSchema(
          ()=>db.attachGuradToPanic(<Required<Pick<IPanic, 'id' | 'guard_id'>>>{...this.body, id: this.id}),
          this.body, attachGuradSchema
        ),
        this.id, idSchema, 
      )
    }
    createPanic(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(()=>db.createPanic(this.body),this.body, createSchema)
    }
}