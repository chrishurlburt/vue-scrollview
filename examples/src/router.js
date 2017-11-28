import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/pages/Home'
import ScrollMarkers from './components/pages/ScrollMarkers'
import Animation from './components/pages/Animation'
import LazyLoad from './components/pages/LazyLoad'
import ScrollSpy from './components/pages/ScrollSpy'
import Test from './components/pages/Test'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/scroll-markers', component: ScrollMarkers },
    { path: '/animation', component: Animation },
    { path: '/lazy-load', component: LazyLoad },
    { path: '/scrollspy', component: ScrollSpy },
    { path: '/test', component: Test }
  ]
})

export default router
