import {reqDetail,reqUpdataCart} from '@/api'
const state = {
    detailInfo:{}
};
const actions = {
    //获取商品详情信息
    async getDetail(context,skuid){
        let result = await reqDetail(skuid); 
        if(result.code ==200){
            context.commit('GETDETAIL',result.data)
        }
    },
    async updataCart({commit},{skuId,skuNum}){
        console.log('updatacart');
        let result = await reqUpdataCart(skuId,skuNum);
        if(result.code == 200){
            return 'ok';
        } 
        return Promise.reject(new Error('fail'));
    }
    
};
const mutations = {
    GETDETAIL(state,data){
        state.detailInfo = data;
    }
};
const getters = {
    categoryView({detailInfo}){
        if(detailInfo.categoryView){
            return `${detailInfo.categoryView.category1Name}/${detailInfo.categoryView.category2Name}/${detailInfo.categoryView.category3Name}`;
        }else{
            return '';
        }
       
    },
    price({detailInfo}){
        return detailInfo.price || {};
    },
    skuInfo({detailInfo}){
        return detailInfo.skuInfo || {};
    },
    saleAttr({detailInfo}){
        return detailInfo.spuSaleAttrList || {};
    }
    
};
export default {
    namespaced:true,
    state,actions,mutations,getters
}