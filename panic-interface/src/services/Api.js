import {ApiService} from './ApiService'
import API_PATHS from '../constansts/apiPath'

export class NativeApiService extends ApiService {
  getGuardsList(){
    return super.get('/guards')
  }
  getClientsList(){
    return super.get('/users?user_role=client')
  }
  getUser(id){
    return super.get(`/users/${id}`)
  }
  updateUser(id, values){
    return super.put(`/users/${id}`, values)
  }
  createUser(id, values){
    return super.post('/users', values)
  }
  deleteUser(id){
    return super.delete(`/users/${id}`)
  }
  getPanicsList(){
    return super.get('/panics')
  }
  getPanic(id){
    return super.get(`/panics/${id}`)
  }
  getGuard(id){
    return super.get(`/guards/${id}`)
  }
}

export const Api = new NativeApiService(API_PATHS.api)