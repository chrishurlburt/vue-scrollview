<template>
  <div :class="['visibility-marker', $vnode.key, { visible }]" :style="{ height: `${height}px` }"></div>
</template>

<script>
export default {
  props: {
      visible: {
          type: Boolean,
          default: () => false
      },
      height: {
          type: Number,
          default: () => 350
      }
  }
}
</script>

<style>
.visibility-marker {
    width: 350px;
    margin-bottom: 1000px;
    background-color: red;
    transition: background-color .2s ease-in-out;
}

.visibility-marker.visible {
    background-color: blue;
}
</style>
