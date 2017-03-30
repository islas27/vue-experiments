import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import config from './config'
import * as types from './mutation-types'
import * as actions from './actions'
import * as getters from './getters'
import notes from './modules/notes'
import users from './modules/users'

// Use Vuex
Vue.use(Vuex)
firebase.initializeApp(config)

// Set firebase reference
let db = firebase.database()
let auth = firebase.auth

export default new Vuex.Store({
  getters,
  actions,
  state: {
    alerts: [],
    db,
    auth,
    notesPath: ''
  },
  modules: {
    notes,
    users
  },
  mutations: {
    [types.ACTIVATE_ALERT] (state, alert) {
      state.alerts.push(alert)
    },
    [types.EXPIRE_ALERT] (state) {
      state.alerts.pop()
    },
    [types.SET_NOTES_PATH] (state, path) {
      state.notesPath = path
    }
  }
})
