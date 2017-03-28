import EventEmitter from 'events'
import firebase from 'firebase'
import config from './config'

class NoteRepository extends EventEmitter {
  constructor () {
    super()
    // Initialize Firebase
    firebase.initializeApp(config)
    this.ref = firebase.database().ref('notes')
    this.attachFirebaseListeners()
  }

  // attach listeners to Firebase
  attachFirebaseListeners () {
    this.ref.on('child_added', this.onAdded, this)
    this.ref.on('child_removed', this.onRemoved, this)
    this.ref.on('child_changed', this.onChanged, this)
  }

  // creates a note
  create ({title = '', content = ''}, onComplete) {
    this.ref.push({title, content}, onComplete)
  }
  // updates a note
  update ({key, title = '', content = ''}, onComplete) {
    this.ref.child(key).update({title, content}, onComplete) // key is used to find the child, a new note object is made without the key, to prevent key being inserted in Firebase
  // this.ref.child(key) will create new reference like this new Firebase(`https://<YOUR-FIREBASE-APP>.firebaseio.com/notes/${key}`)
  }
  // removes a note
  remove ({key}, onComplete) {
    this.ref.child(key).remove(onComplete)
  }

  onAdded (snapshot) {
    // process data
    let note = this.snapshotToNote(snapshot)
    // propagate event outwards with note
    this.emit('added', note)
  }

  onRemoved (oldSnapshot) {
    let note = this.snapshotToNote(oldSnapshot)
    this.emit('removed', note)
  }

  onChanged (snapshot) {
    let note = this.snapshotToNote(snapshot)
    this.emit('changed', note)
  }

  // processes the snapshots to consistent note with key
  snapshotToNote (snapshot) {
    // we will need the key often, so we always want to have the key included in the note
    let key = snapshot.getKey()
    let note = snapshot.val()
    note.key = key
    return note
  }

  // Finds the index of the note inside the array by looking for its key
  findIndex (notes, key) {
    return notes.findIndex(note => note.key === key)
  }

  // Finds the note inside the array by looking for its key
  find (notes, key) {
    return notes.find(note => note.key === key)
  }
}

export default new NoteRepository()
