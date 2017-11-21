<template>
  <div id="app">
    <div class="controls">
      <button class="async-add-components" @click="asyncAddComponents">Async Add Components</button>
      <button class="scroll-by-key" @click="scrollToComponent">Scroll to component with key of "c"</button>
    </div>
    <Scroll-view>
        <template slot-scope="inView">
            <Visibility-marker key="a" :visible="inView.a" />
            <Visibility-marker key="b" :visible="inView.b" />
            <Visibility-marker key="c" :visible="inView.c" />

            <Visibility-marker v-for="k in componentsToAddKeys" :key="k" :visible="inView[k]" />
        </template>
    </Scroll-view>
  </div>
</template>

<script>
import { $scrollview } from '../../../../src'
import VisibilityMarker from './components/VisibilityMarker'

export default {
  name: 'app',
  data() {
    return { componentsToAddKeys: [] }
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
    }
  },
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
}

.controls {
  position: fixed;
  top: 15px;
  right: 15px;
  display: flex;
}
</style>
