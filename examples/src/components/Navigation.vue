<template>
  <nav class="main-navigation">
    <ul class="nav-list">
        <li class="nav-item"><a :href="`${path}#/`">Home</a></li>
        <li class="nav-item"><a :href="`${path}#/lazy-load`">Lazy Loading</a></li>
        <li class="nav-item"><a :href="`${path}#/infinite-scroll`">Infinite Scroll</a></li>
        <li class="nav-item"><a :href="`${path}#/scrollspy`">Scrollspy Navigation</a></li>
        <li class="nav-item"><a :href="`${path}#/animation`">Animation</a></li>
        <li class="nav-item"><a :href="`${path}#/scroll-markers`">Scroll Markers</a></li>
    </ul>
    <p class="menu">Menu</p>
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
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 40px;
    z-index: 99;
}

.main-navigation:hover .nav-list {
    opacity: 1;
    transform: translateY(0);
}

.nav-list {
    transition: all .2s ease-in-out;
    transform: translateY(-100%);
    opacity: 0;
}

.nav-item {
    display: inline-block;
    margin: 0 15px;
}

.menu {
    cursor: pointer;
    border: 1px solid #000;
    padding: 10px 20px;
    margin-left: 15px;
    transition: all .2s ease-in-out;
}

.menu:hover {
    background: #000;
    color: #fff;
}

</style>
