import Vue from 'vue'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      render (h) {
        return h('h1', { 'class': ['hello'] }, 'Welcome to Your Vue.js App')
      }
    }).$mount()

    expect(vm.$el.innerHTML)
    .toEqual('Welcome to Your Vue.js App')
  })
})
