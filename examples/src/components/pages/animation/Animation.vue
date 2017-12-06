<template>
  <section class="animation">
      <Example-start
        title="Animation Example"
        description="This example demonstrates integrating GreenSock with ScrollView
        to animate content at different scroll locations."
      ></Example-start>


      <scroll-view :offset="400">
        <template slot-scope="visibility">

          <Row-section :visible="visibility.row" key="row"></Row-section>
          <Split-section :visible="visibility.split" key="split"></Split-section>
          <Columns-section :visible="visibility.col" key="col"></Columns-section>

        </template>
      </scroll-view>

  </section>
</template>

<script>
import 'gsap'
import ExampleStart from '../../ExampleStart'

import SplitSection from './SplitSection'
import RowSection from './RowSection'
import ColumnsSection from './ColumnsSection'

export default {
  components: {
    ExampleStart,
    ColumnsSection,
    SplitSection,
    RowSection
  },
}
</script>

<style scoped>
  .animation {
    padding-bottom: 100px;
  }
</style>
