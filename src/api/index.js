import requests from "./request";
//分类
export const reqgetCategoryList = () => requests.get(`/product/getBaseCategoryList`);
//搜索
export const reqgetSearchInfo = (params) => requests({ url: "/list", method: "post", data: params });
//商品详情
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });
//添加到购物车/修改购物车
export const reqShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
//获取购物车列表
export const reqShopCartList = () => requests({ url: `/cart/cartList`, method: "get" })
//删除购物车商品
export const reqdeletShopCartList = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" })
///修改选中状态 
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
//获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: "get" })
//注册用户
// export const reqRegistNewUser = (data) => requests({ url: "/user/passport/register", data, method: "post" })
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' });
//登录
export const reqLogin = (data) => requests({ url: "/user/passport/login", data, method: "post" })
//token验证
export const reqTokenVerity = () => requests({ url: "/user/passport/auth/getUserInfo", method: 'get' })
//退出登录
export const reqLogOut = () => requests({ url: "/user/passport/logout", method: "get" })
//获取用户地址
export const reqUserAddress = () => requests({ url: "/user/userAddress/auth/findUserAddressList", method: "get" })
//获取商品清单
export const reqOrderInfo = () => requests({ url: "/order/auth/trade", method: "get" })
//提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "post" })
//根据订单号获取订单信息
export const reqOrderMessage = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" })
//获取订单支付状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })
//获取所有的订单
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: "get" })

//mock虚拟数据
import mock from './mockrequest'
import { method } from "lodash";
//虚拟的大轮播图
export const reqgetBannerList = () => mock.get('/banner')
//虚拟的小轮播图
export const reqgetFloorList = () => mock.get('/floor')
