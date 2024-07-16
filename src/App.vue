<template>
  <header>
    <NavBar :logged="logged"/>
  </header>
  <main>
    <router-view @logged="(value) => receive(value)"></router-view>
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
      logged: false
    }
  },
  methods: {
    receive (value) {
      this.logged = value;
    }
  }
}
</script>

<style>
body {
  background-color: #111;
}
</style>
