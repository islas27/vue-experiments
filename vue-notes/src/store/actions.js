import * as types from './mutation-types'

export const sendAlert = ({ commit }, alert) => {
  commit(types.ACTIVATE_ALERT, alert)
  setTimeout(() => commit(types.EXPIRE_ALERT), 1500)
}

export const setNotesPath = ({ commit }, uid) => {
  let path = 'users/' + uid + '/notes'
  commit(types.SET_NOTES_PATH, path)
}
