# vue-scrollview

[![npm](https://img.shields.io/npm/v/vue-scrollview.svg)](https://www.npmjs.com/package/vue-scrollview) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A Vue.js component for detecting when it's child components are visible within the viewport.

## Overview

vue-scrollview is a Vue.js plugin which registers a ``` <Scroll-view></Scroll-view> ``` component globally. This component utilizes Vue's scoped slot
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

The ``` <Scroll-view></Scroll-view> ``` component utilizes Vue.js scoped slots to facilitate
communication with it's child components. Read more about scoped slots in the [Vue.js documentation](https://vuejs.org/v2/guide/components.html#Scoped-Slots).

#### The 'ready' prop

The ``` <Scroll-view></Scroll-view> ``` component requires a boolean 'ready' prop.

The purpose of the ready prop is to notify the ``` <Scroll-view></Scroll-view> ``` component that all document reflows
are complete and it is safe to retrieve the initial position of the slotted components root elements (needed in order to determine if in viewport).
This is necessary because vue-scrollview caches the initial position of its children relative to the top of the page for performance reasons. If these measurements
were to occur too soon, they may be incorrect.

For example, consider a situation where the ``` <Scroll-view></Scroll-view> ``` component children contain images. There's a chance these images
will load after ``` <Scroll-view></Scroll-view> ``` has taken measurements to determine a child's distance from the top of the page. When the images enter
the DOM, they may cause a reflow changing subsequent children distances from the top of the page, therefore causing the previous measurements to be incorrect. This will likely lead to unexpected behavior.

As a result, it is up to the developer to ensure the ready prop is set at the correct time. This is implementation specific, so solutions will
vary from use case to use case. Please note, if no content is expected to load at a later time and effect the components position on the page, the ready
prop can be set immediately to ``` true ```.

#### The 'key' prop

vue-scrollview requires the use of a unique key prop on the slotted components so that it can perform some tracking internally. Vue.js also requires the use of the key prop on components in certain situations -- for example, with components in a v-for. Read more in the [Vue.js Documentation](https://vuejs.org/v2/guide/list.html#key).

## Practical Use Cases

Refer to the example below. Each of the 4 components is designed to accept a 'visible' prop which is a boolean that indicates whether the component is visible within the viewport. For the purpose of this example, the name 'visible' is used however you can name this prop whatever you like.

The visible prop recieves the the value of scope, which is an object containing properties that track each components visibility by the key provided by the key prop. inView.a holds a boolean that indicates the visibility of ``` <Some-component></Some-component> ``` with a key of 'a' within the viewport, inView.b indicates visibility for  ``` <Some-component></Some-component> ``` with key of 'b', etc.

Note, the value of the scope prop is set to the temporary variable name of 'inView' but any name may be used here.

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

Bundle the js to the `dist` folder:

```bash
npm run build
```

## License

[MIT](http://opensource.org/licenses/MIT)
