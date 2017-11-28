<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from './components/Navigation'

export default {
  name: 'app',
  components: {
    Navigation
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
}

p {
  line-height: 1.5;
}

</style>
