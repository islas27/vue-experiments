<template lang="html">
  <header v-if="user">
    <input placeholder="Search" v-model="searchQuery" debounce="500" @keyup="">
    <div>
      <span>{{userTitle}}</span>
      <img :src="imageUrl" :alt="userTitle"/>
      <a href="#" v-on:click.prevent="signOut">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </a>
    </div>
  </header>
</template>
<script>
  export default {
    data () {
      return {
        searchQuery: '',
        showBar: false
      }
    },
    computed: {
      user () {
        return this.$store.getters.getUser
      },
      authorized () {
        return this.$store.getters.getAuth
      },
      userTitle () {
        return this.user.displayName || this.user.email || ''
      },
      imageUrl () {
        return this.user.photoURL
      }
    },
    watch: {
      'searchQuery': {
        handler () {
          this.$store.dispatch('filterNotes', this.searchQuery)
        }
      },
      'authorized': {
        handler () {
          this.showBar = this.authorized
        }
      }
    },
    methods: {
      signOut () {
        this.$store.dispatch('signOut')
        this.$router.push('Auth')
      }
    },
    ready () {

    }
  }
</script>
<style>
  header{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
    height: 50px;
    background: #333;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,.4);
  }
  header input {
    display: block;
    width: 480px;
    margin: 0 auto;
    height: 30px;
    border: none;
    padding: 0 16px;
    border-radius: 2px;
  }
  header span {
    padding: 15px;
    color: #fff;
    position: absolute;
    right: 95px;
    top: 1px;
  }
  header img {
    width: 35px;
    height: 35px;
    border-radius: 20px;
    position: absolute;
    right: 60px;
    top: 8px;
  }
  header a {
    position: absolute;
    display: block;
    color: #fff;
    right: 15px;
    top: 10px;
    font-size: 25px;
    cursor: pointer;
    transition: color .2s;
  }
  header a:focus, header a:hover {
    color: #41b883;
  }
  @media screen and (max-width: 1200px) {
    header span{
      display: none;
    }
  }
  @media screen and (max-width: 720px) {
    header input{
      width: calc(100% - 64px);
      margin: 0 0 0 16px;
    }
    header span, header img {
      display: none;
    }
  }
</style>
