<template>
  <section class="test">
    <div class="controls">
      <button class="async-add-components" @click="asyncAddComponents">Async Add Components</button>
      <button class="scroll-by-key" @click="scrollToComponent">Scroll to component with key of "c"</button>
      <button class="set-offset" @click="setOffset">Set offset to 349</button>
      <button class="duplicate-key" @click="setDuplicateKey">Add component with duplicate key of 'a'</button>
    </div>
    <Scroll-view :offset="offset">
        <template slot-scope="inView">
            <Visibility-marker v-if="duplicateKey" key="a" />

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
    return { componentsToAddKeys: [], offset: 200, duplicateKey: false, }
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
    setDuplicateKey() {
      this.duplicateKey = true
      $scrollview.refresh()
    }
  },
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
