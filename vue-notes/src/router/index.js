import Vue from 'vue'
import Router from 'vue-router'
import Notes from '../components/Notes'
import Auth from '../components/Auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/notes',
      name: 'Notes',
      component: Notes,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/auth',
      name: 'Auth',
      alias: '/',
      component: Auth
    }
  ]
})
