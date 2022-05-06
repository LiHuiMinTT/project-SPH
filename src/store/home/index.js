//home模块store数据仓库
import { reqCategoryList,reqListContainer,reqFloorContainer } from "@/api";
const state = {
    categoryList:[],
    bannerImgs:[],
    floorList:[]
};
const actions = {
    async getCategoryList(context){
        let result = await reqCategoryList();
        if(result.code==200){
            context.commit('GETCATEGORYLIST',result.data)
        }
    },
    async getListContainer(context){
        let result = await reqListContainer();
        if(result.code==200){
            context.commit('GETLISTCONTAINER',result.data)
        }
    },
    async getFloorList(context){
        let result = await reqFloorContainer();
        if(result.code==200){
            context.commit('GETFLOORLIST',result.data)
        }
    },
};
const mutations = {
    GETCATEGORYLIST(state,list){
        state.categoryList = list;
    },
    GETLISTCONTAINER(state,data){
        state.bannerImgs = data;
    },
    GETFLOORLIST(state,data){
        state.floorList = data
    }
};
const getters = {};
export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters,
}