import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条的样式
import 'nprogress/nprogress.css'
import store from "@/store";
const requests = axios.create({
  baseURL: '/api',
  timeout: 5000,
})
//拦截器实现用户登录的拦截
requests.interceptors.request.use((config) => {
  //如果存在token，将这个随机生成的token加入到请求头中
  if (store.state.datil.nanoid_token) {
    config.headers.userTempId = store.state.datil.nanoid_token
  }
  //如果存在token，将这个的token加入到请求头中
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config;
});
requests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data;
}, (error) => {
  return Promise.reject(new Error('faile'))
});
export default requests;