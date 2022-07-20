// service统一出口
import HYRequest from './request'
//import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL:"http://localhost:8888",
  timeout: 1000,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default hyRequest
