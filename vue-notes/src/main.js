// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import store from './store/Index'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueFire)

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired && (!store.getters.getAuth)) {
    next({ path: '/auth' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
