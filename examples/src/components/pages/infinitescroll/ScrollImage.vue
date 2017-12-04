<template>
  <div class="scroll-image">
    <img :src="source" alt="a placeholder scroll image">
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.scroll-image {
  margin: 0 auto 400px;
  max-width: 600px;
}
</style>

