import * as types from '../mutation-types'
import { errorAlert, successAlert } from '../helpers'

const state = {
  notes: [],
  selectedNote: null,
  searchQuery: '',
  notesRepo: null
}

// getters
const getters = {
  getSelectedNote: state => state.selectedNote,
  getNotes: state => state.notes,
  getSearchQuery: state => state.searchQuery
}

const actions = {
  attachFirebaseListeners ({ state, commit, rootState, dispatch }) {
    state.notesRepo = rootState.db.ref('notes')
    state.notesRepo.on('child_added', (snapshot) => { dispatch('onNoteAdded', snapshot) })
    state.notesRepo.on('child_removed', (snapshot) => { dispatch('onNoteDeleted', snapshot) })
    state.notesRepo.on('child_changed', (snapshot) => { dispatch('onNoteUpdated', snapshot) })
  },
  detachFirebaseListeners ({ state, commit, rootState, dispatch }) {
    state.notesRepo.off('child_added', (snapshot) => { dispatch('onNoteAdded', snapshot) })
    state.notesRepo.off('child_removed', (snapshot) => { dispatch('onNoteDeleted', snapshot) })
    state.notesRepo.off('child_changed', (snapshot) => { dispatch('onNoteUpdated', snapshot) })
  },
  snapshotToNote ({ state, commit, rootState, dispatch }, snapshot) {
    let key = snapshot.getKey()
    let note = snapshot.val()
    note.key = key
    return note
  },
  onNoteAdded ({ state, commit, rootState, dispatch }, snapshot) {
    dispatch('snapshotToNote', snapshot).then((note) => {
      commit(types.CREATE_NOTE, note)
    })
  },
  onNoteDeleted ({ state, commit, rootState, dispatch }, snapshot) {
    dispatch('snapshotToNote', snapshot).then((note) => {
      commit(types.DELETE_NOTE, note)
    })
  },
  onNoteUpdated ({ state, commit, rootState, dispatch }, snapshot) {
    dispatch('snapshotToNote', snapshot).then((note) => {
      let indexToUpdate = state.notes.findIndex((t) => t.key === note.key)
      commit(types.UPDATE_NOTE, note, indexToUpdate)
    })
  },
  createNote ({ state, commit, rootState, dispatch }, note) {
    state.notesRepo.push(note)
    .then(() => {
      let alert = successAlert('Note created successfully', 'success')
      dispatch('sendAlert', alert, { root: true })
    })
    .catch((err) => {
      let alert = errorAlert(err, 'Note impossible to create', 'error')
      dispatch('sendAlert', alert, { root: true })
    })
  },
  deleteNote ({ state, commit, rootState, dispatch }, {key, title = '', content = ''}) {
    state.notesRepo.child(key).remove()
    .then(() => {
      let alert = successAlert('Note deleted successfully', 'success')
      dispatch('sendAlert', alert, { root: true })
    })
    .catch((err) => {
      let alert = errorAlert(err, 'Note impossible to delete', 'error')
      dispatch('sendAlert', alert, { root: true })
    })
  },
  updateNote ({ state, commit, rootState, dispatch }, {key, title = '', content = ''}) {
    state.notesRepo.child(key).update({title, content})
    .then(() => {
      let alert = successAlert('Note updated successfully', 'success')
      dispatch('sendAlert', alert, { root: true })
    })
    .catch((err) => {
      let alert = errorAlert(err, 'Note impossible to update', 'error')
      dispatch('sendAlert', alert, { root: true })
    })
  },
  cleanUp ({ state, commit, rootState, dispatch }) {
    commit(types.CLEAN_UP_NOTES)
  },
  filterNotes ({ state, commit, rootState, dispatch }, searchQuery) {
    commit(types.SET_SEARCH_QUERY, searchQuery)
  }
}

// mutations
const mutations = {
  [types.SELECT_NOTE] (state, note) {
    state.selectedNote = note
  },
  [types.UNSELECT_NOTE] (state) {
    state.selectedNote = null
  },
  [types.CREATE_NOTE] (state, note) {
    state.notes.unshift(note)
  },
  [types.DELETE_NOTE] (state, oldNote) {
    state.notes = state.notes.filter(t => t.key !== oldNote.key)
  },
  [types.UPDATE_NOTE] (state, note, indexToUpdate) {
    state.notes[indexToUpdate] = note
  },
  [types.CLEAN_UP_NOTES] (state) {
    state.notes = []
    state.selectedNote = null
  },
  [types.SET_SEARCH_QUERY] (state, searchQuery) {
    state.searchQuery = searchQuery
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
