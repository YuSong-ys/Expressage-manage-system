import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/reset.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/api/config.js'
import './mock'

Vue.use(ElementUI)
Vue.prototype.$http = http

router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit('getToken')
  let token = store.state.user.token
  // 过滤登录页，防止死循环
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  //组件创建成功后就动态添加路由
  created() {
    store.commit('addMenu', router)
  },
  render: h => h(App)
}).$mount('#app')
