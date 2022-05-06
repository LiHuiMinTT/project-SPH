//search组件数据仓库
import {reqSearchList} from '@/api/index'
const state = {
    searchList:{}
};
const actions = {
     async getSearchList(context,params){
        const result =await reqSearchList(params);
        if(result.code == 200){
            context.commit('GETSEARCHLIST',result.data)
        }
    }
};
const mutations = {
    GETSEARCHLIST(state,data){
        state.searchList = data;
    }
};
const getters = {
    attrsList(state){
        return state.searchList.attrsList;
    },
    goodsList(state){
        return state.searchList.goodsList;
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    }
};
export default {
    namespaced:true,
    state,actions,mutations,getters
}