import { reqShopCartList, reqdeletShopCartList, reqUpdateCheckedByid } from '@/api'
const mutations = {
  GRTCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  //获取购物车列表
  async cateCartList({ commit }) {
    let result = await reqShopCartList()
    if (result.code == 200) {
      commit('GRTCARTLIST', result.data)
    }
  },
  //删除某一个产品的操作
  async cateDeletShopCart({ commit }, skuId) {
    let result = await reqdeletShopCartList(skuId)
    // console.log(result);
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('false'))
    }
  },
  //修改某个商品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //修改所有的选中状态
  async updateAllChecked(context, isChecked) {
    // console.log(context);
    let promiseAll = []
    context.state.cartList[0].cartInfoList.forEach((item) => {
      let promise = context.dispatch('updateCheckedById', {
        skuId: item.skuId,
        isChecked
      })
      promiseAll.push(promise);
    })
    return Promise.all(promiseAll);
  },
  //删除所以选中的商品
  deletAllCheck(context) {
    let promiseAll = [];
    // console.log(context);
    context.getters.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? context.dispatch('cateDeletShopCart', item.skuId) : ""
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll);
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
  cartInfoList(state) {
    return state.cartList[0].cartInfoList
  },

}
const state = {
  cartList: [],
}
export default {
  state,
  actions,
  mutations,
  getters,
};

