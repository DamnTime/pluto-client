import Axios from 'axios'
const axios = Axios.create({
  baseURL: process.env.API_URL,
})

axios.interceptors.request.use((config) => {
  return config
})
axios.interceptors.response.use((response) => {
  if (/^[4|5]/.test(response.status)) {
    return Promise.reject(response.statusText)
  }
  if (response.data.code !== 'S00') {
    return Promise.reject(response.data)
  }
  return response.data.content
})

const requestList = {}
const methods = ['get', 'post', 'put', 'delete']
const isDev = process.env.NODE_ENV === 'development'
methods.forEach((method) => {
  const _method = method.toLowerCase()
  const dataKey = _method === 'get' || method === 'delete' ? 'params' : 'data'
  requestList[method] = (url, data = {}, config = {}) => {
    return axios({
      method,
      url,
      [dataKey]: data,
      ...config,
    }).catch((err) => {
      isDev && console.error(err)
    })
  }
})

export default requestList
