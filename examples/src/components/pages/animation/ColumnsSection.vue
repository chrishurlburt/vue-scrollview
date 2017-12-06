<template>
  <section class="columns-section">

    <div class="columns-section__inner">
      <div class="col" ref="col1">
        <h2>Donec non feugiat</h2>
        <p>Mauris consectetur ullamcorper nulla. In molestie et nisl aliquet suscipit. Pellentesque vitae ipsum quis lectus luctus sagittis.</p>
      </div>
      <div class="col" ref="col2">
        <h2>luctus eros</h2>
        <p>Nunc condimentum turpis nisi, eu malesuada sem dapibus ultricies. Pellentesque vitae ipsum quis lectus luctus sagittis.</p>
      </div>
      <div class="col" ref="col3">
        <h2>enim vitae risus</h2>
        <p>Praesent et turpis vehicula, hendrerit justo porttitor, rhoncus mi. Pellentesque vitae ipsum quis lectus luctus sagittis.</p>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  data() {
    return {
      animated: false,
    }
  },
  watch: {
    visible(visible) {
      if (visible && !this.animated) {
        const { col1, col2, col3 } = this.$refs

        TweenMax
          .staggerFromTo([col1,col2,col3], .8, { y: -150 }, { y: 0, opacity: 1, ease: Bounce.easeOut }, .2)

          this.animated = true
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style scoped>
.columns-section__inner {
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 100px 0;
}

.col {
  opacity: 0;
  width: 33%;
  max-width: 300px;
}

</style>
