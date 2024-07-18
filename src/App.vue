<template>
  <header>
    <NavBar :logged="logged" :username="username"/>
  </header>
  <main>
    <router-view @logged="(log) => receive(log)"></router-view>
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
    }
  },
  methods: {
    receive (log) {
      this.logged = log;
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
