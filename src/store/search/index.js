import { reqgetSearchInfo } from '@/api'
const mutations = {
  CATESEARCHINFO(state, cateSearchInfo) {
    state.cateSearchInfo = cateSearchInfo
  }
}
const actions = {
  async cateSearchInfo({ commit }, params = {}) {
    let info = await reqgetSearchInfo(params);
    // console.log(info.data);
    if (info.code == 200) {
      commit('CATESEARCHINFO', info.data)
    }
  }
}
const getters = {
  goodsList(state) {
    return state.cateSearchInfo.goodsList
  },
  attrsList(state) {
    return state.cateSearchInfo.attrsList
  },
  trademarkList(state) {
    return state.cateSearchInfo.trademarkList
  },
  total(state) {
    return state.cateSearchInfo.total
  }
}
const state = {
  cateSearchInfo: {}
}
export default {
  mutations,
  actions,
  getters,
  state,
}