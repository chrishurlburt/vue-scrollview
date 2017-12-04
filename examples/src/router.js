import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/pages/Home'
import ScrollMarkers from './components/pages/scrollmarkers/ScrollMarkers'
import Animation from './components/pages/animation/Animation'
import LazyLoad from './components/pages/lazyload/LazyLoad'
import ScrollSpy from './components/pages/scrollspy/ScrollSpy'
import InfiniteScroll from './components/pages/infinitescroll/InfiniteScroll'
import Test from './components/pages/test/Test'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, props: { path: __webpack_public_path__ } }, // eslint-disable-line
    { path: '/scroll-markers', component: ScrollMarkers },
    { path: '/animation', component: Animation },
    { path: '/lazy-load', component: LazyLoad },
    { path: '/scrollspy', component: ScrollSpy },
    { path: '/infinite-scroll', component: InfiniteScroll },
    { path: '/test', component: Test, name: 'test' }
  ]
})

export default router
