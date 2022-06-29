import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)
import search from './search/index'
import home from './home/index'
import datil from './detail'
import shopcartlist from "./shopcart";
import user from './user'
import trade from "./trade";

export default new Vuex.Store({
  modules: {
    search,
    home,
    datil,
    shopcartlist,
    user,
    trade,
  }
})