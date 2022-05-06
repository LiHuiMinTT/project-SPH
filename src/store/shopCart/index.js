import {reqGetCart,reqDeleteCartItem,reqChangeCartItem} from '@/api/index'
const state = {
    cartInfo:[]
};
const actions = {
    async getCartList({commit}){
        const result = await reqGetCart();
        if(result.code == 200){
            commit('GETCARTLIST',result.data);
        }
    },
    async deleteItem({commit},id){
        let result = await reqDeleteCartItem(id);
        console.log(result,'result');
        if(result.code == 200){
            return 'ok';
        }else{
            return Promise.reject(new Error('删除商品失败'));
        }
    },
    async changeItem({commit},{skuId,isChecked}){
        let result = await reqChangeCartItem(skuId,isChecked);
        if(result.code == 200){
            return 'ok';
        }
        return Promise.reject(new Error('状态更改失败'));
    },
    async deleteAll(context){
        let delArr = [];
        context.getters.cartList.cartInfoList.forEach(item => {
            if(item.isChecked==1){
                delArr.push(context.dispatch('deleteItem',item.skuId))
            }
        });
        let result = await Promise.all(delArr);
        return result;
    }
};
const mutations = {
    GETCARTLIST(state,data){
        state.cartInfo = data;
    },
};
const getters = {
    cartList(state){
        return state.cartInfo[0] || {};
    }
};
export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters,
}