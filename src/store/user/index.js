import { reqGetCode, reqUserRegister, reqLogin, reqLogOut, reqTokenVerity } from "@/api"
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  USERTOKEN(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEARALLINFO(state) {
    state.token = ""
    state.userInfo = {}
    localStorage.removeItem()
  }
}

const actions = {
  //验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    // console.log(result);
    if (result.code == 200) {
      commit('GETCODE', result.data)
    } else {
      return Promise.reject(new Error('false'))
    }
  },
  //注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    // console.log(result);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //登录
  async userLogin({ commit }, data) {
    let result = await reqLogin(data)
    // console.log(result);
    if (result.code == 200) {
      commit("USERLOGIN", result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('false'))
    }
  },
  //token验证
  async getUserToken({ commit }, token) {
    let result = await reqTokenVerity(token)
    // console.log(result);
    if (result.code == 200) {
      commit('USERTOKEN', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('false'))
    }
  },
  //退出登录清除token/userinfo
  async userLogOut({ commit }) {
    let result = await reqLogOut()
    // console.log(result);
    if (result.code = 200) {
      commit('CLEARALLINFO')
      return 'ok'
    } else {
      return Promise.reject(new Error('false'))
    }
  }
}
const getters = {}
const state = {
  code: '',
  token: '',
  userInfo: {},
}

export default {
  mutations,
  actions,
  getters,
  state

}