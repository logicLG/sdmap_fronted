import axios from 'axios';
import {getCookie} from './cookie'

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://192.168.240.25:13000/dldsj/';
// axios.defaults.baseURL = 'http://172.20.3.106/sdmap/';//这是调用数据接口,TODO:需要设置axios的跳转链接 山东IP
// axios.defaults.baseURL = 'http://192.168.1.90:15000/sdmap/';
axios.defaults.baseURL = 'http://192.168.137.81:15000/sdmap/';
// axios.defaults.baseURL = 'http://localhost:15000/sdmap/'

// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
  config => {
    const token = getCookie('session'); //获取Cookie
    // config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json' //x-www-form-urlencoded保持参数以key-value的形式传到后台，json是以json字符串的形式传到后台
    };
    config.responseType = 'json';//请求数据类型包括'arraybuffer','blob','document','json','text','stream'
    // config.transformRequest= function(data){
    //   return data
    // };   // 只适用于 POST,PUT,PATCH，transformRequest` 允许在向服务器发送前，修改请求数据。后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    // config.transformResponse= function(data){
    //   return data
    // };  //transformResponse` 在传递给 then/catch 前，允许修改响应数据
    // config.validateStatus= function(status){
    //   return status < 400 //状态码小于400时均为成功（返回true）
    // }; //validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    if (token) {
      config.params = {'token': token} //无论请求为何种类型，在params中的属性都会以key=value的格式在urlzhong拼接
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
  // response => {
  //   if(response.data.errCode == 2) {
  //     router.push({
  //       path: '/login',
  //       query: {redirect: router.currentRoute.fullPath} //从哪个页面跳转
  //     })
  //   }
  //   return response;
  // },
  // error => {
  //   return Promise.reject(error.response.data)
  // }
);

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: Object.assign(params, {"tk": "6d0859a912424ae3b41c306a5a1d7022"}),
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {//params是添加到url中传参数，data是添加到请求体中传参数
  return new Promise((resolve, reject) => {
    let tkString = "?tk=c61608dc1f964c72811ccc4958502683"
    if (url.indexOf("sync") != -1 || url.indexOf("download") != -1 || url.indexOf("kill") != -1) {
      tkString = "&tk=c61608dc1f964c72811ccc4958502683"
    }
    axios.post(url + tkString, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

export function remove(url, data = {}) {//params是添加到url中传参数，data是添加到请求体中传参数
  return new Promise((resolve, reject) => {
    axios.delete(url + "&tk=c61608dc1f964c72811ccc4958502683", data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}


/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url + "?&tk=c61608dc1f964c72811ccc4958502683", data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

export default axios;
