import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './components/validate'//表单验证
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/css/swiper.css'; // css 模块

//三级联动组件(全局组件)
import TypeNav from './components/TypeNav/index'
Vue.component(TypeNav.name, TypeNav)
Vue.use(ElementUI);
import '@/mock/mockServe'
Vue.config.productionTip = false

//vue的；懒加载，图片处于加载阶段展示loding效果
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('@/assets/loding.gif'),
})

// new Vue({
//   el: 'body',
//   components: {
//     App
//   }
// })
//导入所有请求
import * as API from '@/api'
new Vue({
  render: h => h(App),
  beforeCreate() {
    //全局事件总线带参数searchSelector和keyword为空
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
