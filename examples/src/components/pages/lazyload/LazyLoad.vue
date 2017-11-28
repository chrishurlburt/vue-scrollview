<template>
  <section class="lazy-load">
    <Example-start
      title="Lazy Load Example"
      description="This is an example demonstrating a Medium style lazy load effect for images. Low resolution
        versions of the images are loaded initially. As images scroll into the viewport, ScrollView
        triggers the full resolution versions to load."
    ></Example-start>
    <div class="images">
      <scroll-view>
        <template slot-scope="visibility">
          <LazyImage from="/static/vw_blur.jpg" to="/static/vw.jpg" :visible="visibility.vw" key="vw"></LazyImage>
          <LazyImage from="/static/temple_blur.jpg" to="/static/temple.jpg" :visible="visibility.temple" key="temple"></LazyImage>
          <LazyImage from="/static/squirrel_blur.jpg" to="/static/squirrel.jpg" :visible="visibility.squirrel" key="squirrel"></LazyImage>
          <LazyImage from="/static/city_blur.jpg" to="/static/city.jpg" :visible="visibility.city" key="city"></LazyImage>
          <LazyImage from="/static/book_blur.jpg" to="/static/book.jpg" :visible="visibility.book" key="book"></LazyImage>
          <LazyImage from="/static/ape_blur.jpg" to="/static/ape.jpg" :visible="visibility.ape" key="ape"></LazyImage>
        </template>
      </scroll-view>
    </div>

  </section>
</template>

<script>
import ExampleStart from '.././../ExampleStart'
import LazyImage from './LazyImage'

export default {
  components: {
    LazyImage,
    ExampleStart
  }
}
</script>

<style scoped>
.images {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

