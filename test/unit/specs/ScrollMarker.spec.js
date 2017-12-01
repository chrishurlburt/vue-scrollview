import Vue from 'vue'
import ScrollView, { $scrollview, ScrollMarker } from '../../../src'


describe('ScrollMarker renders', () => {
  
  it('renders correct contents with required props', () => {
      
    const Ctor = Vue.extend(ScrollMarker)
  
    const vm = new Ctor({
      propsData: {
        name: 'test',
        spacing: 400
      }
    }).$mount()

    const expectedHTML = `<div class="vue-scrollview__marker" style="position: relative; width: 100%; height: 1px; margin-top: 400px; background-color: transparent;"><span class="vue-scrollview__marker--name" style="display: none; position: absolute; bottom: 100%; left: 20px; color: red; font-size: 14px;">test</span></div>`

    expect(vm.$el.outerHTML).toBe(expectedHTML)
  
  })

  it('renders correct contents with debug prop', () => {
    
    const Ctor = Vue.extend(ScrollMarker)

    const vm = new Ctor({
      propsData: {
        name: 'test',
        spacing: 400,
        debug: true
      }
    }).$mount()

    const expectedHTML = `<div class="vue-scrollview__marker debug" style="position: relative; width: 100%; height: 1px; margin-top: 400px; background-color: red;"><span class="vue-scrollview__marker--name" style="display: block; position: absolute; bottom: 100%; left: 20px; color: red; font-size: 14px;">test</span></div>`

    expect(vm.$el.outerHTML).toBe(expectedHTML)

  })


  it('visible watcher emits correct events with correct arguments', (done) => {
    
    const Ctor = Vue.extend(ScrollMarker)

    const vm = new Ctor({
      propsData: {
        visible: false,
        name: 'test'
      }
    }).$mount()

    vm.$on('isVisible', name => {
      expect(name).toBe('test')
      vm.visible = false
    })
    

    vm.$on('isNotVisible', name => {
      expect(name).toBe('test')
      done()
    })

    vm.visible = true

  })  

})
