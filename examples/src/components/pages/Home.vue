<template>
  <section class="home">
      <img class="logo" src="static/logo.jpg" alt="ScrollView Logo">
      <p class="description">
        This is a collection of examples demonstrating different applications
        for ScrollView. Feel free to submit a PR for a new example
        <a href="https://github.com/chrishurlburt/vue-scrollview" target="blank">here</a>.
      </p>
      <p class="description">
        <a href="https://chrishurlburt.gitbooks.io/vue-scrollview/" target="blank">Read the docs</a>
      </p>
  </section>
</template>

<script>
import { $scrollview } from '../../../../src'

export default {

}
</script>

<style scoped>
.home {
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.home a {
  color: #798890;
}

.logo {
  max-width: 600px;
}

.title {
  margin-bottom: 35px;
}

.description {
  max-width: 600px;
  text-align: center;
}

.examples {
  display: flex;
  justify-content: space-around;
}

.examples a {
  margin: 0 15px;
}
</style>
