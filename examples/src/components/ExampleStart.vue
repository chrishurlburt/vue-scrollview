<template>
  <div class="example-start">
    <h1 class="example-title">{{ title }}</h1>
    <p class="example-description">{{ description }}</p>
    <h3>Scroll to Begin</h3>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>


<style scoped>
.example-start {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 1.5;
}

.example-title {
  text-align: center;
}

.example-description {
  text-align: center;
  max-width: 600px;
}
</style>
