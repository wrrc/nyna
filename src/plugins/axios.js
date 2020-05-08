'use strict';

import Vue from 'vue';
import axios from 'axios';
import vm from '../main';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: 'http://127.0.0.1:7001', // process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000, // Timeout
  heards: { // 将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  },
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // 从 vuex 里获取 token
    const token = vm.$store.state.token;
    // 如果 token 存在就在请求头里添加
    token && (config.headers.Authorization = token);
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if (response.data.code) {
      switch (response.data.code) {
        // case 100:
        case 201:
        case 202:
          vm.$store.commit('setAlertInfo', {
            color: 1,
            msg: response.data.message,
          });
          break;
        case 201:
        case 2011:
        case 2012:
        case 2032:
          vm.$store.commit('setAlertInfo', {
            color: 2,
            msg: response.data.message,
          });
        break;
        case 1013:
        case 1011:
        case 1014:
        case 2013:
        case 2022:
        case 2023:
        case 2031:
        case 2043:
        case 2051:
          vm.$store.commit('setAlertInfo', {
            color: 3,
            msg: response.data.message,
          });
          break;
        case 1012:
        case 2021:
          vm.$store.commit('setAlertInfo', {
            color: 4,
            msg: response.data.message,
          });
          vm.$router.push('/login');
          break;
        case 2052:
          vm.$router.push('*');
          break;
        default: break;
      };
    }
    return response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
