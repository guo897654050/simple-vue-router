import Vue from 'vue'
import App from './components/app.vue'
import test from './components/test.vue'
import home from './components/home.vue'
import vueRouter from '../router'
Vue.config.productionTip = false
Vue.use(vueRouter)

const router = new vueRouter({
  mode: 'hash',
  routes: [{
    path: '/home',
    name: 'home',
    component: home
  }, {
    path: '/test',
    name: 'test',
    component: test
  }]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
