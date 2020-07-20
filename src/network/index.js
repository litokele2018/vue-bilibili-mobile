import axios from 'axios'

let ins = axios.create({
  baseURL: 'http://112.74.99.5:3000/web/api'
})

ins.interceptors.request.use((config) => {
  let id = localStorage.getItem('id')
  let token = localStorage.getItem('token')
  if (id && token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

ins.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})


export default ins