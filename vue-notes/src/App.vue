<template>
  <div id="app">
    <alerts :alerts="activatedAlerts"></alerts>
    <create-note-form></create-note-form>
    <notes></notes>
    <update :note.sync="selectedNote"></update>
  </div>
</template>

<script>
import CreateNoteForm from './components/notes/Create'
import Notes from './components/notes/Notes'
import Update from './components/notes/Update'
import Alerts from './components/Alerts'

export default {
  name: 'app',
  components: {
    Alerts,
    Notes,
    CreateNoteForm,
    Update
  },
  computed: {
    selectedNote () {
      return this.$store.getters.getSelectedNote
    },
    activatedAlerts () {
      return this.$store.getters.getActivatedAlerts
    }
  },
  mounted () {
    this.$store.commit('attachFirebaseListeners')
  },
  destroyed () {
    this.$store.commit('detachFirebaseListeners')
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
