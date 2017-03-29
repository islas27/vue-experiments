import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import config from './config'
import * as types from './mutation-types'
import * as actions from './actions'
import * as getters from './getters'
import notes from './modules/notes'

// Use Vuex
Vue.use(Vuex)
firebase.initializeApp(config)

// Set firebase reference
let db = firebase.database()
let store

export default store = new Vuex.Store({
  getters,
  actions,
  state: {
    alerts: [],
    db: db
  },
  modules: {
    notes
  },
  mutations: {
    [types.ACTIVATE_ALERT] (state, alert) {
      store.state.alerts.push(alert)
    },
    [types.EXPIRE_ALERT] (state) {
      store.state.alerts.pop()
    }
  }
})
