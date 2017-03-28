import firebase from 'firebase'
import config from './config'

// Initialize Firebase
firebase.initializeApp(config)
let db = firebase.database()

export default {
  notes: db.ref('notes')
}
