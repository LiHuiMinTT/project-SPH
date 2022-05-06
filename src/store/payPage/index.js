import {reqPayPage} from '@/api'
const state={
    payinfo:{}
};
const actions={
    async getPayInfo({commit},data){
        const result =await reqPayPage();
        console.log(result,'pay页面数据');
        if(result.code == 200){
            commit('GETPAYINFO',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('获取支付页面数据失败'));
        }
    }
};
const mutations = {
    GETPAYINFO(state,data){
        state.payinfo = data;
    }
};
const getters = {};
export default {
    namespaced:true,
    state,actions,mutations,getters
}