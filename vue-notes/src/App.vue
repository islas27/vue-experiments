<template>
  <div id="app">
    <header-bar></header-bar>
    <alerts :alerts="activatedAlerts"></alerts>
    <router-view></router-view>
  </div>
</template>

<script>
import Alerts from './components/Alerts'
import HeaderBar from './components/HeaderBar'

export default {
  name: 'app',
  components: {
    Alerts,
    HeaderBar
  },
  computed: {
    activatedAlerts () {
      return this.$store.getters.getActivatedAlerts
    }
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
