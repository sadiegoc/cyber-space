<template>
  <header>
    <NavBar :logged="logged" :username="username"/>
  </header>
  <main>
    <router-view @logged="(log, username) => receive(log, username)"></router-view>
  </main>
  <footer>
    <FooterComponent/>
  </footer>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'App',
  components: { NavBar, FooterComponent },
  data () {
    return {
      logged: false,
      username: ""
    }
  },
  methods: {
    receive (log, username) {
      this.logged = log;
      this.username = username;
    }
  }
}
</script>

<style>
body {
  background-color: #111;
}

main {
  width: 100vw; height: calc(100vh - 60px);
}
</style>
