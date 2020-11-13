import { APIGatewayProxyEvent } from 'aws-lambda'
import db, { IGuard } from '..'
import { validateSchema } from '../../utils'

const Joi = require('joi')

const geolocationSchema = Joi.object({
  geolocation: Joi.object({
    lat: Joi.number().required(),
    lon: Joi.number().required()
  }).required(),
})

const availabilitySchema = Joi.object({
  available: Joi.boolean().required(),
})
  

const idSchema = Joi.number().required()

export class Guard implements Partial<IGuard> {
    id: number;
    body: Omit<IGuard, 'id'>;
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
      let parsedBody: IGuard
      if(body){
        try {
          parsedBody = JSON.parse(body)
        } catch (error) {
          this.error = error
          return { id: Number(id), body: parsedBody }
        }  
      }
      return { id: Number(id), body: parsedBody }
    }
    
    getGuardsList(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(()=>db.getGuardsList())
    }

    getGuard(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(()=>db.getGuardsList({id: this.id}),this.id, idSchema)
    }
      

    updateGuardGeolocation(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(
        ()=>validateSchema(
          ()=>db.updateGuardGeolocation({...this.body, id: this.id }),
          this.body, geolocationSchema  
        ),
        this.id, idSchema
      )
    }

    updateGuardAvailability(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(
        ()=>validateSchema(
          ()=>db.updateGuardAvailability({...this.body, id: this.id }),
          this.body, availabilitySchema  
        ),
        this.id, idSchema
      )
    }
}