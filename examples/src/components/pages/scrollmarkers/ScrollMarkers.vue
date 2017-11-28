<template>
  <section class="scroll-markers">
    <div class="scroll-container">

      <Example-start
        v-if="!currentlyShowing"
        title="Scroll Markers Example"
        description="This is an example demonstrating the use of scrollmarkers as triggers for scroll positions."
      ></Example-start>

      <p v-if="currentlyShowing === 'first'" class="scroll-section">
        As the scroll markers enter visibility, the trigger the text
        to change.
      </p>

      <p v-if="currentlyShowing === 'second'" class="scroll-section">
        Instead of just changing text, you could attach different actions
        to each scroll marker trigger point.
      </p>


      <div v-if="currentlyShowing === 'third'" class="scroll-section">
        <p>
          Notice how the scroll markers are red lines... that is because the
          debug prop is set to 'true'.
        </p>
      </div>


      <p v-if="currentlyShowing === 'fourth'" class="scroll-section">
        You might also notice they markers dont trigger a change
        of text until they're well into the viewport -- that's because
        of the scroll-view component's default offset of 200px (can be changed
        via props).
      </p>

      <p v-if="currentlyShowing === 'fifth'" class="scroll-section">
        The end.
      </p>

    </div>
    <div class="markers">
      <scroll-view>
        <template slot-scope="visible">
          <scroll-marker
            v-for="m in markers"
            :key="m"
            :visible="visible[m]"
            :name="m"
            :spacing="1500"
            :debug="debug"
            @isVisible="markerVisible"
            @isNotVisible="markerNotVisible"
          ></scroll-marker>
        </template>
      </scroll-view>
    </div>
  </section>
</template>

<script>
import ExampleStart from '.././../ExampleStart'

export default {
  components: {
    ExampleStart,
  },
  data() {
    return {
      markers: ['first', 'second', 'third', 'fourth', 'fifth'],
      debug: true,
      currentlyShowing: '',
    }
  },
  methods: {
    markerVisible(name) {
      this.currentlyShowing = name
    },
    markerNotVisible(name) {
      if (name === 'first') this.currentlyShowing = ''
    }
  }
}
</script>

<style scoped>
.scroll-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-section {
  max-width: 600px;
  text-align: center;
}

.markers {
  width: 100%;
  padding-bottom: 300px;
}
</style>
