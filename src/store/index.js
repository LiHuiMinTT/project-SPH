import homeModule from './home'
import Vue from 'vue'
import vuex from 'vuex'
import searchModule from './search'
import detailModule from './detail'
import shopCartModule from './shopCart'
import userModule from './user'
import payModule from './payPage'
Vue.use(vuex);
export default new vuex.Store({
    modules:{
        homeModule,
        searchModule,
        detailModule,
        shopCartModule,
        userModule,
        payModule
    }
})