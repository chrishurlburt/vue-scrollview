<template>
  <section class="infinite-scroll">
    <Example-start
      title="Infinite Scroll Example"
      description="This is an example demonstrating infinite scroll using the onLastEnter callback. As the last image
      enters visibilitiy, an ajax request is made to a test API to fetch more items. The new items are then added
      to the scrollview in increments of 5."
    ></Example-start>
    <scroll-view>
      <template slot-scope="visible">
        <!--
          ScrollImage doesn't need a 'visible' prop becuase it doesn't care about it's visibility.
          For the sake of this demo, we only care when the last component enters the viewport.
        -->
        <ScrollImage v-for="i in items" :source="i.url" :key="i.id" />
      </template>
    </scroll-view>
  </section>
</template>

<script>
import { $scrollview } from '../../../../../src'
import ExampleStart from '../../ExampleStart'
import ScrollImage from './ScrollImage'
import axios from 'axios'

export default {
  components: {
    ScrollImage,
    ExampleStart,
  },
  data() {
    return {
      page: 1,
      items: []
    }
  },
  watch: {
    page: {
      immediate: true,
      handler: function () {
        // get some more items everytime the page changes
        this.fetchMore()
      }
    }
  },
  methods: {
    fetchMore() {
      axios.get(`https://jsonplaceholder.typicode.com/albums/${this.page}/photos`)
        .then(({ data }) => this.items = this.items.concat(data.slice(1, 6)))
        .catch(console.log)
    },
  },
  mounted () {
    $scrollview.onLastEntered = () => {
      console.log('called')
      this.page++ // last component entered, increment the page
    }
  }
}
</script>
