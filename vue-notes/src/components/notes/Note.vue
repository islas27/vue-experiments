<template lang="html">
  <div class="note">
    <h1>{{note.title}}</h1>
    <pre>{{note.content}}</pre>
  </div>
</template>

<script>
export default {
  props: ['note']
}
</script>

<style lang="css">
.note{
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 5px #ccc;
    padding: 10px;
    width: 240px;
    margin: 8px 0;
  }
  .note h1{
    font-size: 1.1em;
    margin-bottom: 6px;
  }
  .note pre {
    font-size: 1.1em;
    margin-bottom: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
  }
</style>
