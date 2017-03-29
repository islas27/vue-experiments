<template>
  <div id="app">
    <create-note-form></create-note-form>
    <notes></notes>
    <update :note.sync="selectedNote"></update>
  </div>
</template>

<script>
import CreateNoteForm from './components/notes/Create'
import Notes from './components/notes/Notes'
import Update from './components/notes/Update'

export default {
  name: 'app',
  components: {
    Notes,
    CreateNoteForm,
    Update
  },
  computed: {
    selectedNote () {
      return this.$store.getters.getSelectedNote
    }
  },
  mounted () {
    this.$store.commit('attachFirebaseListeners')
  }
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
