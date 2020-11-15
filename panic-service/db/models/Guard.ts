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

const paramsSchema = Joi.object({
  id: Joi.number(),
  user_id: Joi.string(),
  name: Joi.string(),
  surname: Joi.string(),
  organization: Joi.string(),
  user_role: Joi.string().valid('guard'),
  available: Joi.boolean(),
  geolocation: Joi.object({
    lat: Joi.number().required(),
    lon: Joi.number().required()
  }).error(()=>{
    const error = new Joi.ValidationError()
    error.details = [{
      message: 'To get closest guard pass query param such as \'close_to=[lon],[lat]\', e.g. \'close_to=-23.3424,65.1231231\''
    }]
    return error
  })
})
  

const idSchema = Joi.number().required()

function parseCloseToParameter(close_to: string){
  const [,lon, lat] = /(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/.exec(close_to) || []

  return { lon, lat }
}
export class Guard implements Partial<IGuard> {
    id: number;
    body: Omit<IGuard, 'id'>;
    queryStringParameters: any;
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
      const { queryStringParameters } = event
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
      if(queryStringParameters) this.queryStringParameters = queryStringParameters
      return { id: Number(id), body: parsedBody }
    }
    
    getGuardsList(){
      if(this.error) return Promise.resolve({error: this.error})
      let properties
      if( this.queryStringParameters){
        const  { close_to, ...rest } = this.queryStringParameters
        if (close_to) rest.geolocation = parseCloseToParameter(close_to)
        properties = rest
      }
      return validateSchema(()=>db.getGuardsList(properties), properties, paramsSchema)
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