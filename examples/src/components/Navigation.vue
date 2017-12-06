<template>
  <nav class="main-navigation">
    <p class="docs"><a :href="`${path}#/`">ScrollView Examples</a></p>
    <ul class="nav-list">
        <li class="nav-item"><a :href="`${path}/#/lazy-load`">Lazy Loading</a></li>
        <li class="nav-item"><a :href="`${path}/#/infinite-scroll`">Infinite Scroll</a></li>
        <li class="nav-item"><a :href="`${path}/#/scrollspy`">Scrollspy Navigation</a></li>
        <li class="nav-item"><a :href="`${path}/#/animation`">Animation</a></li>
        <li class="nav-item"><a :href="`${path}/#/scroll-markers`">Scroll Markers</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
      path() {
          return __webpack_public_path__
      }
  }
}
</script>

<style scoped>
.main-navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background:#798890;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 99;
    height: 50px;
}

.docs a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;
}

.nav-item {
    display: inline-block;
    margin: 0 15px;
}

.nav-item a {
    color: #fff;
    text-decoration: none;
}

.nav-item a:hover {
    text-decoration: underline;
}
</style>
