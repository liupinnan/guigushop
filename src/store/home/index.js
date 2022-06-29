import { reqgetCategoryList, reqgetBannerList, reqgetFloorList } from '@/api'
const mutations = {
  CATEGORYLIST(state, cateGoryList) {
    state.cateGoryList = cateGoryList
  },
  CATEBANNERLIST(state, cateBannerList) {
    state.cateBannerList = cateBannerList
  },
  CATEFLOORLIST(state, cateFloorList) {
    state.cateFloorList = cateFloorList
  }
}
const actions = {
  async cateGoryList({ commit }) {
    let list = await reqgetCategoryList()
    if (list.code == 200) {
      commit('CATEGORYLIST', list.data)
      // console.log(list.data);
    }
  },
  async cateFloorList({ commit }) {
    let floor = await reqgetFloorList()
    // console.log(floor.data);
    if (floor.code = 200) {
      commit('CATEFLOORLIST', floor.data)
    }
  },
  async cateBannerList({ commit }) {
    let banner = await reqgetBannerList()
    // console.log(banner);
    if (banner.code == 200) {
      commit('CATEBANNERLIST', banner.data)
      // console.log(banner.data);
    }
  },
}
const state = {
  cateGoryList: [],
  cateBannerList: [],
  cateFloorList: []
}
export default {
  mutations,
  actions,
  // getters,
  state,
}