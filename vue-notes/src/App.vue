<template>
  <div id="app">
    <create-note-form></create-note-form>
    <notes></notes>
  </div>
</template>

<script>
import CreateNoteForm from './components/notes/Create'
import Notes from './components/notes/Notes'

// import firebase from 'firebase/app'
// import 'firebase/database'
//
// const config = {
//   apiKey: 'AIzaSyDkoASntC6pMw9g0HE-Mx8q4lf0jpAb9LQ',
//   databaseURL: 'https://vue-notes-72f32.firebaseio.com/'
// }
//
// let app = firebase.initializeApp(config)
// let db = app.database()

export default {
  name: 'app',
  components: {
    Notes,
    CreateNoteForm
  }
  // firebase: (function () {
  //   return {
  //     notes: db.ref('notes')
  //   }
  // }())
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html{
  font-family: sans-serif;
}

body{
  background: #eee;
  padding: 0 16px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
