# VueScrollview

[![npm](https://img.shields.io/npm/v/vue-scrollview.svg)](https://www.npmjs.com/package/vue-scrollview) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A Vue.js for detecting when components are visible in the viewport via the Vue.js scoped slots api.

## Overview

vue-scrollview is a Vue.js plugin which registers a ```html <Scroll-view></Scroll-view> ``` component globally. This component utilizes Vue's scoped slot
API to notify its child components when they are visible within the viewport via props.

## Installation

```bash
npm install --save vue-scrollview
```

## Setup

### Bundler (Webpack, Rollup)

```js
// in your entrypoint
import Vue from 'vue'
import ScrollView from 'vue-scrollview'

Vue.use(ScrollView)
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<script src="vue-scrollview/dist/vue-scrollview.js"></script>

<!-- From CDN -->
<script src="https://unpkg.com/vue-scrollview"></script>
```

## Usage

### Required Markup

#### Scoped Slots

The ```html <Scroll-view></Scroll-view> ``` component utilizes Vue.js scoped slots to facilitate
communication with it's child components. Read more about scoped slots in the Vue.js documentation.

#### The 'ready' prop

The ```html <Scroll-view></Scroll-view> ``` component requires a boolean 'ready' prop.

The purpose of the ready prop is to notify the ```html <Scroll-view></Scroll-view> ``` component that all document reflows
are complete and it is safe to retrieve the initial position of the slotted components root elements (needed in order to determine if in viewport).
This is necessary because vue-scrollview caches the initial position of its children relative to the top of the page for performance reasons. If these measurements
were to occur too soon, they may be incorrect.

For example, consider a situation where the ```html <Scroll-view></Scroll-view> ``` component children contain images. There's a chance these images
will load after ```html <Scroll-view></Scroll-view> ``` has taken measurements to determine a child's distance from the top of the page. When the images enter
the DOM, they may cause a reflow changing subsequent the children distances from the top of the page, therefore causing the previous measurements to be incorrect.

As a result, it is up to the developer to ensure the ready prop is set at the correct time. This is implementation specific, so solutions will
vary from use case to use case. Please note, if no content is expected to load at a later time and effect the components position on the page, the ready
prop can be set immediately to ```js true ```.

```html
  <div id="scrollview-example">
    <Scroll-view :ready="true">
      <template scope="inView">
        <Some-component :visible="inView.a" key="a"></Some-component>
        <Some-component :visible="inView.b" key="b"></Some-component>
        <Some-component :visible="inView.c" key="c"></Some-component>
        <Some-component :visible="inView.d" key="d"></Some-component>
      </template>
    </Scroll-view>
  </div>
```

## Development

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run build
```

## License

[MIT](http://opensource.org/licenses/MIT)
