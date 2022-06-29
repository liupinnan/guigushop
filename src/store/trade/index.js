import { reqUserAddress, reqOrderInfo } from '@/api'
const mutations = {
  USERADDRESS(state, userAddressList) {
    state.userAddressList = userAddressList
  },
  ORDERINFO(state, userOrderInfo) {
    state.userOrderInfo = userOrderInfo
  }
}
const actions = {
  //地址信息
  async getUserAddress({ commit }) {
    let result = await reqUserAddress()
    console.log(result);
    if (result.code == 200) {
      commit('USERADDRESS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  //订单信息
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo()
    console.log(result);
    if (result.code == 200) {
      commit('ORDERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}
const state = {
  userAddressList: [],
  userOrderInfo: {}
}
const getters = {

}
export default {
  mutations,
  actions,
  state,
  getters,

}