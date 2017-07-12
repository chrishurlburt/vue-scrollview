# vue-scrollview

[![npm](https://img.shields.io/npm/v/vue-scrollview.svg)](https://www.npmjs.com/package/vue-scrollview) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A flexible and performant Vue.js component for notifying components when they enter and leave the viewport.

***vue-scrollview v2.0 improvements***

vue-scrollview has undergone a complete rewrite. New features have been added, limitations have been removed and performance has been improved.


- The 'ready' prop on ``` <Scroll-view></Scroll-view> ``` component in no longer necessary and has been eliminated. vue-scrollview is able to intelligently determine when to recache component locations.
- There is no longer a limit to the amount of ``` <Scroll-view></Scroll-view> ``` components that can be mounted at a given time in your app. vue-scrollview tracks all components in a ``` <Scroll-view></Scroll-view> ```across all of it's instances.
- New methods for programmatically scrolling to component locations, getting component locations and more.

## Overview

vue-scrollview is a Vue.js plugin which registers a ``` <Scroll-view></Scroll-view> ``` component globally. This component utilizes Vue's scoped slot API to notify its child components when they enter and leave visibility within the viewport. vue-scrollview can be used to trigger lazily-loaded resources, animate in components based on scroll location, and scroll spy navigations -- just to name a few use cases.

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
vue-scrollview additionally accepts some options on initialization for fine-grained configuration. The defaults are shown below:

```js

const options = {
  throttle: 50, // frequency component locations are recalculated on scroll in milliseconds.
  callbacks: [] // custom functions to call on scroll
}

Vue.use(ScrollView, options)

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


#### The 'key' prop

vue-scrollview requires the use of a __unique__ key prop on the slotted components so that it can perform some tracking internally. Vue.js also requires the use of the key prop on components in certain situations -- for example, with components in a v-for. Read more in the [Vue.js Documentation](https://vuejs.org/v2/guide/list.html#key).


## Practical Use Cases

Refer to the example below. Each of the 4 components is designed to accept a 'visible' prop which is a boolean that indicates whether the component is visible within the viewport. For the purpose of this example, the name 'visible' is used, however you can name this prop whatever you like.

The visible prop recieves the the value of scope, which is an object containing properties that track each components visibility by the key provided by the key prop. inView.a holds a boolean that indicates the visibility of ``` <Some-component></Some-component> ``` with a key of 'a' within the viewport, inView.b indicates visibility for  ``` <Some-component></Some-component> ``` with key of 'b', etc.

Note, the value of the scope prop is set to the temporary variable name of 'inView' but any name may be used here.


### Ex. 1 - Detecting in viewport

[Live Example](https://codepen.io/churlburt/pen/xrmgrj?editors=0110)

```html
  <div id="scrollview-example">
    <Scroll-view>
      <template scope="inView">
        <Some-component :visible="inView.a" key="a"></Some-component>
        <Some-component :visible="inView.b" key="b"></Some-component>
        <Some-component :visible="inView.c" key="c"></Some-component>
        <Some-component :visible="inView.d" key="d"></Some-component>
      </template>
    </Scroll-view>
  </div>
```

```js

const Child = {
  template: `
    <div :style="{background: (visible) ? 'red' : '#ccc'}" class="child">
      some child component
    </div>
  `,
  props: {
    visible: {
      type: Boolean,
      default: () => false
     }
  }
}

new Vue({
  el: '#scrollview-example',
  components: {
    'some-component': Child
  }
})
 
```

### Ex. 2 - Transitioning a component on enter/leave viewport


### Ex. 3 - Asynchronous operations on enter/leave viewport


### Ex. 4 - Programmatically navigate to components location on page


## Props

``` <Scroll-view></Scroll-view> ``` accepts some additional props to fine-tune configuration.

- ``` offset ``` - Number - Use to adjust when a component is considered 'in viewport', defaults to 200. This will cause a component to be registered as visible when it is 200px from the bottom while scrolling down or 200px from the top while scrolling up.

- ``` tag ``` - String - Use to control wrapper element of scrollview, defaults to 'span'.

## The $scrollview Object

The $scrollview object is responsible for tracking component locations across all instances of ``` <Scroll-view /> ```, cacheing component locations and notifying ``` <Scroll-view /> ``` instances when one of their children has become visible in the viewport. It also exposes several methods that can be used to scroll to a specific component, get a components location, or force vue-scrollview to recache all component locations.

### Usage

```js

import { $scrollview } from 'vue-scrollview'

methods: {
  goToSomeComponent(key) {
    $scrollview.scrollToComponent(key, 200)
  }
}

```

### Methods

#### scrollToComponent()
The ``` scrollToComponent ``` method accepts two arguments, the key of a component in a ``` <Scroll-view /> ``` and optionally, an offset.

``` $scrollview.scrollToComponent(key, offset) ```

By default, ``` scrollToComponent ``` will scroll to a component's location on the page minus the offset assigned to the ``` <Scroll-view /> ``` it is within. You may also provide a custom offset as the second argument to override this.

#### getComponentLocation()
The ``` getComponentLocation ``` method accepts one argument, the key of a component in a ``` <Scroll-view /> ```.

``` $scrollview.getComponentLocation(key) ```

This method will return a component's distance from the top of viewport.

#### forceRefresh()
The ``` forceRefresh ``` methods is used to force vue-scrollview to recalculate all component positions and re-check for their visibility within the viewport.

``` $scrollview.forceRefresh() ```

It's unlikely you'll ever need to use this, but it's there if you need it.

## Development

### Build

Bundle the js to the `dist` folder:

```bash
npm run build
```

## Acknowledgements

Special thanks to github user [@posva](https://github.com/posva) for the excellent [template](https://github.com/posva/vue-plugin-template) this plugin is based on.

## License

[MIT](http://opensource.org/licenses/MIT)
