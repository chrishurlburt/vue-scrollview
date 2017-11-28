<template>
  <section class="home">
      <h1 class="title">ScrollView Examples</h1>
      <div class="examples">
        <a href="/#/animation">Animation</a>
        <a href="/#/lazy-load">Lazy Loading</a>
        <a href="/#/scrollspy">Scrollspy Navigation</a>
        <a href="/#/scroll-markers">Scroll Markers</a>
      </div>
  </section>
</template>

<script>
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

.title {
  margin-bottom: 35px;
}

.examples {
  display: flex;
  justify-content: space-around;
}

.examples a {
  margin: 0 15px;
}
</style>
