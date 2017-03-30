<template lang="html">
  <div class="notes" ref="notes">
    <note v-for="note in notes" :note="note" :key="note.key"></note>
  </div>
</template>

<script>
import Note from './Note'
import Masonry from 'masonry-layout'

export default {
  components: {
    Note
  },
  computed: {
    searchQuery () {
      return this.$store.getters.getSearchQuery
    },
    notes () {
      let notes = this.$store.getters.getNotes
      if (this.searchQuery.length === 0) return notes
      else {
        return notes.filter((note) => note.title.indexOf(this.searchQuery) !== -1 ||
          note.content.indexOf(this.searchQuery) !== -1)
      }
    }
  },
  watch: {
    'notes': { // watch the notes array for changes
      handler () {
        this.$nextTick(function () {
          this.masonry.reloadItems()
          this.masonry.layout()
        })
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
  }
}

</script>

<style lang="css">
  .notes{
    padding: 0 100px;
  }
</style>
