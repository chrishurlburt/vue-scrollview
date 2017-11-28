import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/pages/Home'
import Test from './components/pages/Test'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/test', component: Test }
  ]
})

export default router
