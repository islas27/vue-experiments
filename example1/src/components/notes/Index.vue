<template lang="html">
  <div class="notes" ref="notes">
    <note v-for="note in notes" :note="note" ></note>
  </div>
</template>

<script>
import Note from './Note'
import data from '../../data/Index'
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
  mounted () {
    let masonry = new Masonry(this.$refs.notes, {
      itemSelector: '.note',
      columnWidth: 240,
      gutter: 16,
      fitWidth: true
    })
    data.notes.on('child_added', (snapshot) => {
      let note = snapshot.val()
      this.notes.unshift(note)
      this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
        masonry.reloadItems()
        masonry.layout()
      })
    })
  }
}

</script>

<style lang="css">
  .notes{
    padding: 0 100px;
  }
</style>
