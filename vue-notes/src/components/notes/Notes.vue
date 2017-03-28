<template lang="html">
  <div class="notes" ref="notes">
    <note v-for="note in notes" :note="note" :key="note.key"></note>
  </div>
</template>

<script>
import Note from './Note'
import noteRepository from '../../data/NoteRepository'
import Masonry from 'masonry-layout'

export default {
  components: {
    Note
  },
  data () {
    return {
      notes: []
    }
  },
  watch: {
    'notes': { // watch the notes array for changes
      handler () {
        setTimeout(() => {
          this.masonry.reloadItems()
          this.masonry.layout()
        }, 200)
      },
      deep: true // we also want to watch changed inside individual notes
    }
  },
  mounted () {
    this.masonry = new Masonry(this.$refs.notes, {
      itemSelector: '.note',
      columnWidth: 240,
      gutter: 16,
      fitWidth: true
    })
    noteRepository.on('added', (note) => {
      this.notes.unshift(note)
    })
    noteRepository.on('changed', ({key, title, content}) => {
      let outdatedNote = noteRepository.find(this.notes, key) // get specific note from the notes in our VM by key
      outdatedNote.title = title
      outdatedNote.content = content
    })
    noteRepository.on('removed', ({key}) => {
      let noteToRemove = noteRepository.find(this.notes, key) // get specific note from the notes in our VM by key
      this.notes = this.notes.filter(note => note !== noteToRemove)
    })
  }
}

</script>

<style lang="css">
  .notes{
    padding: 0 100px;
  }
</style>
