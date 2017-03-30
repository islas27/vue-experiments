import * as types from '../mutation-types'
import { errorAlert, successAlert } from '../helpers'

const state = {
  auth: false,
  currentUser: null,
  uid: ''
}

const getters = {
  getUser: state => state.currentUser,
  getAuth: state => state.auth,
  getUid: state => state.uid
}

const actions = {
  signUpWithPassword ({ commit, state, dispatch, rootState }, credential) {
    rootState.auth().createUserWithEmailAndPassword(credential.email, credential.password)
    .then((user) => {
      dispatch('signIn', user)
    })
    .catch((error) => {
      console.log(error)
      let alert = errorAlert(error, 'Impossible to create account', 'error')
      dispatch('sendAlert', alert, { root: true })
    })
  },
  signInWithPassword ({ commit, state, dispatch, rootState }, credential) {
    rootState.auth().signInWithEmailAndPassword(credential.email, credential.password)
    .then((user) => {
      dispatch('signIn', user)
    })
    .catch((error) => {
      console.log(error)
      let alert = errorAlert(error, 'Impossible to sign in', 'error')
      dispatch('sendAlert', alert, { root: true })
    })
  },
  signInWithProvider ({ commit, state, dispatch, rootState }, socialNetwork) {
    let provider
    switch (socialNetwork) {
      case 'google':
        provider = new rootState.auth.GoogleAuthProvider()
        break
    }
    rootState.auth().signInWithPopup(provider)
    .then((result) => {
      dispatch('signIn', result.user)
      // var token = result.credential.accessToken
    })
    .catch((error) => {
      console.log(error)
      let alert = errorAlert(error, 'Impossible to sign in', 'error')
      dispatch('sendAlert', alert, { root: true })
    })
  },
  signIn ({ commit, state, dispatch, rootState }, user) {
    commit(types.SET_USER, user)
    dispatch('sendAlert', alert, { root: true })
    dispatch('setNotesPath', user.uid, {root: true})
    dispatch('attachFirebaseListeners')
  },
  signOut ({ commit, state, dispatch, rootState }) {
    rootState.auth().signOut()
    .then(() => {
      commit(types.SET_USER, null)
      let alert = successAlert('Signed out successfully', 'success')
      dispatch('sendAlert', alert, { root: true })
      dispatch('detachFirebaseListeners')
      dispatch('cleanUp')
    })
    .catch((error) => {
      console.log(error)
      let alert = successAlert('Signed out successfully', 'success')
      dispatch('sendAlert', alert, { root: true })
    })
  }
}

const mutations = {
  [types.SET_USER] (state, user) {
    state.currentUser = user
    state.auth = !!user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
