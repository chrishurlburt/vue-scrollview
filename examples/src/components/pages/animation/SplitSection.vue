<template>
  <section class="fade-section">
    <div class="image-col col">

      <img src="static/camera.jpg" ref="camera">

    </div>
    <div class="content-col col" ref="content">
      <h1 class="content-title" ref="title">Some Headline</h1>
      <p class="content-copy" ref="copy">
        This is some section copy Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Integer leo velit, ullamcorper sed elit sit amet, maximus lobortis felis. Duis quis dolor 
        in purus aliquet tempus. Donec non feugiat felis.
      </p>
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
        const { camera, content, title, copy } = this.$refs
        TweenMax.to(camera, .6, { opacity: 1, scale: 1, ease: Expo.easeOut })
        TweenMax.to(content, .6, { scaleY: 1, ease: Expo.easeOut })
        TweenMax.to([title, copy], .5, { delay: .4, opacity: 1 })
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

<style>
.fade-section {
  display: flex;
}

.col {
  width: 50%;
}

.image-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px;
  overflow: hidden;
}

.content-col {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  color: #fff;
  background: #ff3400;
  transform: scaleY(0);
  transform-origin: center bottom;
}

.content-title, .content-copy {
  opacity: 0;
}

.content-title {
  margin-top: 0;
  font-size: 48px;
}

.content-copy {
  max-width: 550px;
}

.image-col img {
  max-width: 500px;
  transform: scale(2);
  opacity: 0;
}
</style>
