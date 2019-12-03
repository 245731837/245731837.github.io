
import axios from "axios"

import Vue from 'vue';
import { Toast,Loading } from 'vant';
Vue.use(Toast);
Vue.use(Loading);

// axios.defaults.baseURL = "http://localhost:2020/" //应用的基路径

export const http =axios

var token =null;
axios.defaults.headers.common['token'] = token;     // token 为 空  视频1106/4 46分钟  这段代码网上赋值固定格式 ，假设token为空
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios 拦截器   Interceptors

// 请求 request 拦截器   请求之前业务逻辑 配置 data /headers
axios.interceptors.request.use(function (config) {
    // 请求发送之前做的事情
    // console.log(config)
    //在发送请求之前 每次把 token 放到config.headers 请求里面
    token = sessionStorage.token ?  sessionStorage.token : "";
    config.headers['token'] = token;
    var URL =config.url;

    if(URL=="/vue/lushi/getcode"||URL=="/vue/lushi/login"||URL=="vue/lushi/cont"){
        
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 300
          });
    }


    return config;
}, function (error) {
    //请求发送失败
    Toast.fail('请求发送失败',{duration: 500});
    console.log("请求失败")
    // Toat("请求失败","error")
    return Promise.reject(error);

});

// 响应 response 拦截器   根据返回的状态码 做对应的业务逻辑 
axios.interceptors.response.use(function (response) {
    // 获取到响应数据做的事情, 以后在这里打印请求成功获取的数据就行了
    // console.log(response)

    return response;
}, function (error) {

    Toast.fail('响应失败',{duration: 500});
    console.log("响应失败")

    return Promise.reject(error);
});