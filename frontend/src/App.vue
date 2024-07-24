<template>
  <div>
    <header>
      <NavBar :username="username"/>
    </header>
    <main>
      <router-view @username="(u = null) => logged(u)"></router-view>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: { NavBar },
  data () {
    return {
      username: "",
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
