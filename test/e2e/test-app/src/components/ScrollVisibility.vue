<template>
  <div :class="['scroll-visibility', $vnode.key, { visible }]">

  </div>
</template>

<script>
export default {
  name: 'ScrollVisibility',
  props: {
    visible: {
      type: Boolean,
      default: () => false
    }
  },
}
</script>

<style scoped>
.scroll-visibility {
  height: 350px;
  width: 350px;
  background: red;
  margin-bottom: 1000px;
  transition: background .2s ease-in-out;
}

.scroll-visibility.visible {
  background: blue;
}
</style>
