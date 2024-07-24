<template>
  <div>
    <header>
      <NavBar :username="username" :logged="log"/>
    </header>
    <main>
      <router-view @username="(u = null) => logged(u)"></router-view>
    </main>
    <footer>
      <FooterComponent/>
    </footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'App',
  components: { NavBar, FooterComponent },
  data () {
    return {
      username: "",
      log: false
    }
  },
  methods: {
    logged (username) {
      if (username) {
        this.username = username;
        this.log = true;
      } else this.log = false;
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
