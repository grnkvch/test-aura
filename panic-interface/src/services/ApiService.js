import axios from 'axios'

export class ApiService {
  constructor(baseURL) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: this.getHeaders(),
    })
  }

  getHeaders() {
    return {}
  }

  async get(path, config) {
    const result = await this.axiosInstance.get(path, config)
    return result.data
  }

  async post(path, data, config) {
    const result = await this.axiosInstance.post(path, data, config)
    return result.data
  }

  async put(path, data, config) {
    const result = await this.axiosInstance.put(path, data, config)
    return result.data
  }

  async delete(path, config) {
    const result = await this.axiosInstance.delete(path, config)
    return result.data
  }
}
