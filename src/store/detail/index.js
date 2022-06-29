import { reqGoodsInfo, reqShopCart } from "@/api";
import { getNanoid } from "../../utils/nanoid_token"

const state = {
  goodInfo: {},
  nanoid_token: getNanoid(),
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  //获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },

  async postShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqShopCart(skuId, skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('false'))
    }
  }
};
//简化数据而生
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || {}
  }

};
export default {
  state,
  actions,
  mutations,
  getters,
};
