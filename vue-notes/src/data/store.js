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

export default store = new Vuex.Store({
  state: {
    selectedNote: null,
    notes: []
  },
  getters: {
    getSelectedNote: state => state.selectedNote,
    getNotes: state => state.notes
  },
  mutations: {
    selectNote: (state, note) => {
      store.state.selectedNote = note
    },
    unselectNote: state => {
      store.state.selectedNote = null
    },
    createNote: (state, note) => {
      ref.push(note)
    },
    updateNote: (state, {key, title = '', content = ''}) => {
      ref.child(key).update({title, content})
    },
    deleteNote: (state, {key, title = '', content = ''}) => {
      ref.child(key).remove()
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
      console.log('Store/attachFirebaseListeners')
      ref.on('child_added', (snapshot) => { store.commit('onAdded', snapshot) })
      ref.on('child_removed', (snapshot) => { store.commit('onRemoved', snapshot) })
      ref.on('child_changed', (snapshot) => { store.commit('onChanged', snapshot) })
    },
    detachFirebaseListeners () {
      console.log('Store/detachFirebaseListeners')
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
