import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条的样式
import 'nprogress/nprogress.css'

const requests = axios.create({
  baseURL: '/mock',
  timeout: 5000,
})
//请求的拦截器（insterceptors拦截器）（发起axios请求进行拦截，调nprogress的中方法start实现进度条的效果）
requests.interceptors.request.use((config) => {
  nprogress.start()
  return config;//默认要做的事情
});
//相应拦截
requests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data;
}, (error) => {
  return Promise.reject(new Error('faile'))
});
export default requests;