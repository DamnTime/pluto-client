import Vue from 'vue'
import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.API_URL,
})

axios.interceptors.request.use((config) => {
  return config
})
axios.interceptors.response.use(
  (response) => {
    if (response.data.code !== 'S00') {
      Vue.prototype.$Modal.error({
        content: response.data.msg,
      })
      return Promise.reject(response.data.msg)
    }
    return response.data.content
  },
  (err) => {
    const res = err.response || {}
    const errorMsg = res.data.msg
    if (/^[4|5]/.test(err.response.status)) {
      Vue.prototype.$Modal.error({
        title: '系统提示',
        content: '系统异常，请稍候重试',
      })
      return Promise.reject(err)
    }
    Vue.prototype.$Modal.error({
      title: '系统提示',
      content: errorMsg,
    })
    return Promise.reject(err)
  }
)

const requestList = {}
const methods = ['get', 'post', 'put', 'delete']
methods.forEach((method) => {
  const _method = method.toLowerCase()
  const dataKey = _method === 'get' || method === 'delete' ? 'params' : 'data'
  requestList[method] = (url, data = {}, config = {}) => {
    return axios({
      method,
      url,
      [dataKey]: data,
      ...config,
    })
  }
})

export default requestList
