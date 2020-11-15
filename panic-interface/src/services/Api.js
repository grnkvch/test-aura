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
  getAvailabileGuards(){
    return super.get('/guards?available=true')
  }
  getClosestGuards(lon, lat){
    return super.get(`/guards?close_to=${lon},${lat}`)
  }
  resolvePanic(id){
    return super.put(`panics/${id}/resolve`)
  }
  attachGurad(id, guard_id){
    return super.put(`panics/${id}/attachGurad`, { guard_id })
  }
  updateAvailability(id, available){
    return super.put(`guards/${id}/updateAvailability`, { available })
  }
}

export const Api = new NativeApiService(API_PATHS.api)