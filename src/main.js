// import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import * as api from './store/api'
import store from './store'
// import filters from './filters/filters'
// import {mkTree} from './mk'
// import VuePreview from 'vue-preview'
import promise from 'es6-promise'
promise.polyfill()

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(VuePreview)

// 注册全局属性
Vue.prototype.$Vue = Vue
Vue.prototype.$api = api
Vue.prototype.$moment = moment

Vue.config.productionTip = false

// 禁止浏览器后退按钮
// history.pushState(null, null, document.URL)
/* window.addEventListener('popstate', function () {
  history.pushState(null, null, document.URL)
}) */

// for (let key in filters) {
//   Vue.filter(key, filters[key])
// }
// let permission = window.sessionStorage.getItem('to')
// if (permission) {
//   let menu = mkTree(JSON.parse(window.localStorage.getItem('mks')))
//   let addRoutes = [{
//     path: '/home',
//     component: require('./home.vue'),
//     name: '',
//     isMenu: true,
//     children: menu
//   }]
//   router.addRoutes(addRoutes)
// }
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     window.sessionStorage.removeItem('to')
//     window.localStorage.removeItem('menu')
//     window.localStorage.removeItem('mks')
//   }
//   if (to.path === '/' || to.path === '') {
//     next({ path: '/login' })
//     window.sessionStorage.removeItem('to')
//     window.localStorage.removeItem('menu')
//   } else {
//     if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       if (window.sessionStorage.getItem('to')) {
//         next()
//       } else {
//         next({
//           path: '/login'
//           // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         })
//       }
//     } else {
//       next()
//     }
//   }
// })

/* eslint-disable no-new */
const vueInstance = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})

export default vueInstance
