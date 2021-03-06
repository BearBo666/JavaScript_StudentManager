//引入axios并挂载
import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
    baseURL: 'http://localhost:8080',
    //超时时间6秒
    timeout: 6000
})

//请求拦截器
service.interceptors.request.use(config => {

    return config
})

export default service