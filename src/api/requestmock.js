//对axios进行二次封装  目的：请求和相应拦截器
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
//1、利用axios的create创建一个axios实例
const mockrequest = axios.create({
    baseURL:'/mock',
    timeout:5000,
});
//请求拦截器
mockrequest.interceptors.request.use((config)=>{
    //config配置对象，里面有一个headers请求头对象
    nprogress.start();
    return config;
})
//响应拦截器，传入成功与失败的回调
mockrequest.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done();
    return res.data;
},(err)=>{
    return promise.reject(new Error('faile'));
})
//对外暴露
export default mockrequest;