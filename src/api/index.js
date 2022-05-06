//对api接口统一管理
import request from './request'
import mockrequest from './requestmock';
//获取三级列表数据
export const reqCategoryList = ()=> request({url:'/product/getBaseCategoryList',method:'get'});
//search请求
export const reqSearchList = (params)=>request({url:'/list',method:'post',data:params});
export const reqListContainer = ()=> mockrequest({url:'/banner',method:'get'});
//获取首页floor数据
export const reqFloorContainer = ()=> mockrequest({url:'/floor',method:'get'});
//获取商品详情
export const reqDetail = (skuId)=> request({url:`/item/${skuId}`,method:'get'});
//从服务器数据库中更新商品数目
export const reqUpdataCart = (skuId,skuNum)=> request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});
//获取购物车商品列表
export const reqGetCart = ()=> request({url:`/cart/cartList`,method:'get'});
//删除购物车中商品
export const reqDeleteCartItem = (skuId)=> request({url:`/cart/deleteCart/${skuId}`,method:'delete'});
//更改购物车中商品选中状态
export const reqChangeCartItem = (skuId,isChecked)=> request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});
//获取注册验证码
export const reqGetCode  = (phoneNumber)=> request({url:`/user/passport/sendCode/${phoneNumber}`,method:'get'});
//注册信息.data为注册信息对象
export const reqRegister  = (data)=> request({url:`/user/passport/register`,data,method:'post'});
//登录
export const reqLogin  = (data)=> request({url:`/user/passport/login`,data,method:'post'});
//登录后获取用户信息
export const reqGetUserInfo  = ()=> request({url:`/user/passport/auth/getUserInfo`,method:'get'});
//获取订单交易页信息
export const reqPayPage  = ()=> request({url:`/order/auth/trade`,method:'get'});
//获取支付页面信息
export const reqPayInfo  = (tradeNo,data)=> request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});
//获取总价
export const getTotalPrice  = (id)=> request({url:`/payment/weixin/createNative/${id}`,method:'get'});

    

