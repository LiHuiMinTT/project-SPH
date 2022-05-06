
import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/pages/Home'
import register from '@/pages/Register/index.vue'
import login from '@/pages/Login/index.vue'
import search from '@/pages/Search/index.vue'
import detail from '@/pages/Detail'
import cart from '@/pages/ShopCart'
import addShopCart from '@/pages/AddCartSuccess'
import payPage from '@/pages/Trade'
import pay from '@/pages/Pay'

let originpush = VueRouter.prototype.push
let originreplach = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originpush.call(this, location, resolve, reject);
    } else {
        originpush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originreplach.call(this, location, resolve, reject);
    } else {
        originreplach.call(this, location, () => { }, () => { })
    }
}
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            name: 'zhuye',
            path: '/',
            redirect: {
                path: '/home'
            }
        },
        {
            name: 'home',
            path: '/home',
            component: home,
            meta: {
                footshow: true
            }

        },
        {
            name: 'register',
            path: '/register',
            component: register,
            meta: {
                footshow: false
            }
        }, {
            name: 'login',
            path: '/login',
            component: login,
            meta: {
                footshow: false
            }
        }, {
            name: 'search',
            path: '/search/:keyword',
            component: search,
            meta: {
                footshow: true
            },
            props($route) {
                //返回键值对对象，对应组件用key接收
                return $route.query;
            }
        },
        {
            name: 'detail',
            path: '/detail/:skuid',
            component: detail,
            meta: {
                footshow: true
            }
        },
        {
            name: 'addShopcart',
            path: '/cart/:skuId/:skuNum',
            component: addShopCart,
            meta: {
                footshow: true
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: cart,
            meta: {
                footshow: true
            }
        },
        {
            path:'/payPage/',
            name:'payPage',
            component:payPage,
            meta:{
                footshow:false
            }
        },
        {
            path:'/pay/:orderId',
            name:'pay',
            component:pay,
            meta:{
                footshow:false
            },
            props(route){

            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 };//滚动条距离视口0，相当于滚动到顶部
    }
});
router.beforeEach((to, from, next) => {
    const checkPath = ['cart', 'addShopcart'];
    if (checkPath.includes(to.name)) {
        if (localStorage.getItem('token')) {
            next();
        } else {
            alert('您尚未登陆，请先登录后再进行其他操作');
            next('/home');
        };
    } else {
        next();
    }

}
);
export default router;