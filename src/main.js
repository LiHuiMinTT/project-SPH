import Vue from 'vue'
import App from './App.vue'
import { Button,MessageBox,Message } from 'element-ui';
Vue.config.productionTip = false
import router from '@/router'
import typenav from '@/components/typenav'
import pagination from '@/components/pagination'
Vue.component('typenav',typenav)
Vue.component('pagination',pagination)
Vue.component(Button.name,Button)
import store from './store'
import '@/css/swiper.css'
import * as API from '@/api'
Vue.prototype.$alert = MessageBox.alert;
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
    Vue.prototype.$message = Message;
  }
}).$mount('#app')
