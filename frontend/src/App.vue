<template>
  <header>
    <NavBar :username="username"/>
  </header>
  <main>
    <router-view @username="(u) => logged(u)"></router-view>
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
      username: false
    }
  },
  methods: {
    logged (username) {
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
