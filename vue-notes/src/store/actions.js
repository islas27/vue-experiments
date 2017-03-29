import * as types from './mutation-types'

export const sendAlert = ({ commit }, alert) => {
  commit(types.ACTIVATE_ALERT, alert)
  setTimeout(() => commit(types.EXPIRE_ALERT), 1500)
}
