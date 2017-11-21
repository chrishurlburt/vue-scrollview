<template>
  <div :class="['visibility-marker', $vnode.key, { visible }]"></div>
</template>

<script>
export default {
  props: {
      visible: {
          type: Boolean,
          default: () => false
      }
  }
}
</script>

<style>
.visibility-marker {
    height: 350px;
    width: 350px;
    margin-bottom: 1000px;
    background-color: red;
    transition: background-color .2s ease-in-out;
}

.visibility-marker.visible {
    background-color: blue;
}
</style>
