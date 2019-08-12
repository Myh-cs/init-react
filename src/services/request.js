import axios from 'axios';
import api from './api.js';

// import ErrorMap from '@/utils' // 全局错误处理的code 码与提示信息的映射。

//You can create a custom instance of axios.
const instance = axios.create({
  baseURL: '/api'
});
// Add a request interceptor
// 全局请求前处理
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (config.method === 'post' && !config.data){
    console.warn('请求参数不可为空')
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
// 全局错误处理
instance.interceptors.response.use(function (response) {
  // Do something with response data
  console.log('response', response);
  // 无权限
  if (response.data.errno === 10007){
    window.location.href = '/login';
  }
   
  return response;
}, function (error) {
  console.log('response error', error)
  // alert(error);
  // Do something with response error
  return Promise.reject(error);
});
// If you may need to remove an interceptor later you can.

// const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);

export const API = api;
export default class Request {
  static API = api;
  /**
  * 封裝axios.get請求
  * @param {String} url [請求url地址]
  * @param {Object} params [請求攜帶引數]
  */
  static get(url, params = {}) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'get',
        params: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url,
      };
      instance(options)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        reject(e);
      })
    })
  }
  /**
   * 封裝axios.post請求
   * @param {String} url [請求url地址]
   * @param {Object} params [請求攜帶引數]
   */
  static post(url, params = {}) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'post',
        data: params,
        headers: { 'Content-Type': 'application/json' },
        url,
      };
      instance(options)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error);
      })
    })
  }
  /**
   * 封裝axios.all請求
   * @param {Function Array} [function] [請求url地址]
   */
  static all(arr = []) {
    return new Promise((resolve, reject) => {
      instance.all(arr)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error);
      })
    })
  }

}
