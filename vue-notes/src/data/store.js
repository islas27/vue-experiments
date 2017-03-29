import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import config from './config'

// Use Vuex
Vue.use(Vuex)
firebase.initializeApp(config)

// Set firebase reference
let ref = firebase.database().ref('notes')
let store
function errorLogging (err, msg, type) {
  let alert = {
    type: type,
    message: msg,
    err: err
  }
  store.commit('activateAlert', alert)
}

function successLogging (msg, type) {
  let alert = {
    type: type,
    message: msg
  }
  store.commit('activateAlert', alert)
}

export default store = new Vuex.Store({
  state: {
    selectedNote: null,
    alerts: [],
    notes: []
  },
  getters: {
    getActivatedAlerts: state => state.alerts,
    getSelectedNote: state => state.selectedNote,
    getNotes: state => state.notes
  },
  mutations: {
    activateAlert: (state, alert) => {
      store.state.alerts.push(alert)
      setTimeout(() => store.commit('expireAlert'), 1500)
    },
    expireAlert: (state) => {
      store.state.alerts.pop()
    },
    selectNote: (state, note) => {
      store.state.selectedNote = note
    },
    unselectNote: state => {
      store.state.selectedNote = null
    },
    createNote: (state, note) => {
      ref.push(note)
      .then(() => successLogging('Note created successfully', 'success'))
      .catch((err) => errorLogging(err, 'Note impossible to create', 'error'))
    },
    updateNote: (state, {key, title = '', content = ''}) => {
      ref.child(key).update({title, content})
      .then(() => successLogging('Note updated successfully', 'success'))
      .catch((err) => errorLogging(err, 'Note impossible to update', 'error'))
    },
    deleteNote: (state, {key, title = '', content = ''}) => {
      ref.child(key).remove()
      .then(() => successLogging('Note deleted successfully', 'success'))
      .catch((err) => errorLogging(err, 'Note impossible to deleted', 'error'))
    },
    onAdded (state, snapshot) {
      store.dispatch('snapshotToNote', snapshot).then((note) => {
        store.state.notes.unshift(note)
      })
    },
    onChanged (state, snapshot) {
      store.dispatch('snapshotToNote', snapshot).then((note) => {
        var key = note.key
        let indexToUpdate = store.state.notes.findIndex((note) => note.key === key)
        store.state.notes[indexToUpdate] = note
      })
    },
    onRemoved (state, oldSnapshot) {
      store.dispatch('snapshotToNote', oldSnapshot).then((note) => {
        store.state.notes = store.state.notes.filter(t => t.key !== note.key)
      })
    },
    attachFirebaseListeners () {
      ref.on('child_added', (snapshot) => { store.commit('onAdded', snapshot) })
      ref.on('child_removed', (snapshot) => { store.commit('onRemoved', snapshot) })
      ref.on('child_changed', (snapshot) => { store.commit('onChanged', snapshot) })
    },
    detachFirebaseListeners () {
      ref.off('child_added', (snapshot) => { store.commit('onAdded', snapshot) })
      ref.off('child_removed', (snapshot) => { store.commit('onRemoved', snapshot) })
      ref.off('child_changed', (snapshot) => { store.commit('onChanged', snapshot) })
    }
  },
  actions: {
    // processes the snapshots to consistent note with key
    snapshotToNote ({commit}, snapshot) {
      // we will need the key often, so we always want to have the key included in the note
      let key = snapshot.getKey()
      let note = snapshot.val()
      note.key = key
      return note
    }
  }
})
