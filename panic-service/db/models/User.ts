import { APIGatewayProxyEvent } from 'aws-lambda'
import db, { IUser } from '..'
import { validateSchema } from '../../utils'

const Joi = require('joi')

const createSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string(),
  organization: Joi.string(),
  user_role: Joi.string().valid('admin','guard','client').required(),
}).required()

const commonSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  surname: Joi.string(),
  organization: Joi.string(),
  user_role: Joi.string().valid('admin','guard','client'),
})

const idSchema = Joi.string().guid().required()

export class User implements Partial<IUser> {
    id?: string;
    name: string;
    surname?: string;
    organization?: string;
    user_role: 'admin'|'guard'|'client';
    body: Omit<IUser, 'id'>;
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
      const { id } = (event.pathParameters || {})
      const { queryStringParameters } = event
      console.log('queryStringParameters', queryStringParameters)
      const { body } = event
      console.log('body', body)
      let parsedBody: IUser
      if(body){
        try {
          parsedBody = JSON.parse(body)
        } catch (error) {
          this.error = error
          return { id, body: parsedBody }
        }  
      }
      if(queryStringParameters) this.queryStringParameters = queryStringParameters
      return { id, body: parsedBody }
    }
    
    createUser(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(()=>db.createUser(this.body),this.body, createSchema)
    }

    deleteUser(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(()=>db.deleteUser(this.id),this.id, idSchema)
    }

    updateUser(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(
        ()=>validateSchema( 
          ()=>db.updateUser({...this.body, id: this.id, }),
          this.body, commonSchema
        ),
        this.id, idSchema, 
      )
    }

    getUsersList(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(()=>db.getUsersList(this.queryStringParameters), 
        this.queryStringParameters, 
        commonSchema
      )
    }

    getUser(){
      if(this.error) return Promise.resolve({error: this.error})
      return validateSchema(()=>db.getUsersList({id: this.id}), this.id, idSchema)
    }
}