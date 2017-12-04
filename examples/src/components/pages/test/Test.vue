<template>
  <section :class="['test', { scrollingUp: scrollDir === 'UP', scrollingDown: scrollDir === 'DOWN', lastEntered }]">
    <div class="controls">
      <button class="async-add-components" @click="asyncAddComponents">Async Add Components</button>
      <button class="scroll-by-key" @click="scrollToComponent">Scroll to component with key of "c"</button>
      <button class="set-offset" @click="setOffset">Set offset to 349</button>
      <button class="scroll-direction" @click="checkScrollDirection">Check scroll direction</button>
      <button class="change-height" @click="changeHeight">Change height</button>
    </div>
    <Scroll-view :offset="offset">
        <template slot-scope="inView">
            <visibility-marker :height="heightChange" key="h" :visible="inView.h" />

            <Visibility-marker key="a" :visible="inView.a" />
            <Visibility-marker key="b" :visible="inView.b" />
            <Visibility-marker key="c" :visible="inView.c" />
            
            <Visibility-marker v-for="k in componentsToAddKeys" :key="k" :visible="inView[k]" />
        </template>
    </Scroll-view>
  </section>
</template>

<script>
import { $scrollview } from '../../../../../src'
import VisibilityMarker from './VisibilityMarker'

export default {
  data() {
    return {
      componentsToAddKeys: [],
      offset: 200,
      scrollDir: '',
      heightChange: 10,
      lastEntered: false,
    }
  },
  components: {
    VisibilityMarker
  },
  methods: {
    asyncAddComponents() {
      setTimeout(() => {
        this.componentsToAddKeys = ['d', 'e', 'f']
        $scrollview.refresh()
      }, 500)
    },
    scrollToComponent() {
      $scrollview.scrollToComponent('c')
    },
    setOffset() {
      this.offset = 349
    },
    checkScrollDirection() {
      this.scrollDir = $scrollview.getScrollDirection()
    },
    changeHeight() {
      this.heightChange = 1000
    },
    lastComponentEnterd() {
      this.lastEntered = true
    }
  },
  mounted() {
    $scrollview.onLastEntered = this.lastComponentEnterd
  }
}
</script>

<style scoped>
.controls {
  position: fixed;
  top: 15px;
  right: 15px;
  display: flex;
}
</style>
