// import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detial from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
import MyOrder from '../pages/Center/myOrder'
import GroupOrder from '../pages/Center/groupOrder'
export default [
  {
    path: '*',
    redirect: "/home"
  },
  {
    path: "/center",
    name: "Center",
    component: Center,
    meta: { show: true },
    children: [
      {
        path: "",
        redirect: "myorder"
      },
      {
        path: "myorder",
        component: MyOrder,
      }, {
        path: "grouporder",
        component: GroupOrder,

      }
    ]
  },
  {
    path: "/paysuccess",
    name: "PaySuccess",
    component: PaySuccess,
    meta: { show: true }
  },
  {
    path: "/pay",
    name: "Pay",
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade' || from.path == '/') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: "/trade",
    name: "Trade",
    component: Trade,
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next();
      } else {
        next(false)
      }
    }
  },
  {
    path: "/shopcart",
    name: "ShopCart",
    component: ShopCart,
    meta: { show: true }
  },
  {
    path: "/addcartsuccess",
    name: "AddCartSuccess",
    component: AddCartSuccess,
    meta: { show: true }
  },
  {
    path: '/detail/:skuId',
    // redirect: "/home"
    component: Detial,
    meta: { show: true }
  },
  {
    path: '/home',
    component: () => import('../pages/Home'),
    name: 'home',
    meta: { show: true }
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: { show: false }
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
    meta: { show: false },

  },
  {
    path: '/search/:keyword?',
    component: Search,
    name: 'search',
    meta: { show: false },
    // props: route => ({keyword3: route.params.keyword, keyword4: route.query.keyword2})
  },
]