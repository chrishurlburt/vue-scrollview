<template>
  <div id="app">
    <Navigation v-if="$route.name !== 'test'"></Navigation>
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
* {
  box-sizing: border-box;
}

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
