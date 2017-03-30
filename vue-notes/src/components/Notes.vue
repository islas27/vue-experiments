<template lang="html">
  <div id="notes">
    <create-note-form></create-note-form>
    <notes></notes>
    <update :note.sync="selectedNote"></update>
  </div>
</template>

<script>
import CreateNoteForm from './notes/Create'
import Notes from './notes/Notes'
import Update from './notes/Update'

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
    this.$store.dispatch('attachFirebaseListeners')
  },
  destroyed () {
    this.$store.dispatch('detachFirebaseListeners')
  }
}
</script>

<style>

</style>
