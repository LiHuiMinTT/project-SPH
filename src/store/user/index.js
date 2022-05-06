//注册登录模块
import {reqGetCode,reqRegister,reqLogin,reqGetUserInfo}from '@/api'
const state = {
    checkCode:'',
    Token:localStorage.getItem('token'),
    userInfo:{}
};
const actions = {
    async reqGetCode({commit},phoneNumber){
        const result = await reqGetCode(phoneNumber) 
        if(result.code == 200){
            commit('REQGETCODE',result.data);
        }else{
            return Promise.reject(new Error('获取验证码失败'));
        }
    },
    async reqRegister({commit},data){
        const result = await reqRegister(data);
        console.log(result);
        if(result.code == 200){
            return 'ok';
        }else{
            return Promise.reject(new Error('注册失败'));
        }
    },
    async checkLogin({commit},data){
        let result = await reqLogin(data);
        if(result.code == 200){
            commit('CHECKLOGIN',result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    async getUserInfo({commit}){
        let result = await reqGetUserInfo();
        if(result.code == 200){
            commit('GETUSERINFO',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'));
        }
    }
};
const mutations = {
    REQGETCODE(state,code){
        state.checkCode = code;
    },
    CHECKLOGIN(state,data){
       localStorage.setItem('token',data);
       state.Token = data;
    },
    GETUSERINFO(state,data){
        state.userInfo = data;
    }
};
const getters = {};
export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}