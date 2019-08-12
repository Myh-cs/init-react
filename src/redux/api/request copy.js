import axios from 'axios';
// import ErrorMap from '@/utils' // 全局错误处理的code 码与提示信息的映射。

//You can create a custom instance of axios.
const instance = axios.create();
// Add a request interceptor
// 全局请求前处理
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
// 全局错误处理
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
// If you may need to remove an interceptor later you can.

// const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);
export default instance