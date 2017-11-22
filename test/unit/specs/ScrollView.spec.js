import Vue from 'vue'
import ScrollView, { $scrollview } from '../../../src'


describe('ScrollView renders', () => {

  it('renders correct contents', () => {
    
    const Ctor = Vue.extend({
      render(h) {    
        return h(
          'Scroll-view',
          {
            scopedSlots: {
              default: (props) => h('span', 'hello')
            }
          }
        )
      }
    })

    Ctor.use(ScrollView)
    const vm = new Ctor().$mount()
    expect(vm.$el.innerHTML).toBe('<span>hello</span>')
  })


  it('renders HTML tag from prop', () => {
    const Ctor = Vue.extend({
      render(h) {    
        return h(
          'Scroll-view',
          {
            scopedSlots: {
              default: (props) => h('span', 'hello')
            },
            props: {
              tag: 'div'
            }
          }
        )
      }
    })

    Ctor.use(ScrollView)
    const vm = new Ctor().$mount()
    
    expect(vm.$el.outerHTML).toBe('<div><span>hello</span></div>')
  })


  it('Adds scrollview & scroll components to tracking', () => {

    const ScrollComp = Vue.extend({
      render(h) {
        return h('p', 'test scroll component')
      }
    })


    const Ctor = Vue.extend({
      render(h) {
        return h(
          'Scroll-view',
          {
            scopedSlots: {
              default: (props) => h(ScrollComp, { key: 'testKey' } )
            },
            props: {
              tag: 'div'
            },
            ref: 'testScrollview'
          }
        )
      }
    })

    Ctor.use(ScrollView)
    const vm = new Ctor().$mount()

    const SV_ID = vm.$refs.testScrollview._uid

    expect($scrollview.state.scrollviews[SV_ID])
      .toBeInstanceOf(Vue)

    expect($scrollview.state.tracking[SV_ID].testKey)
      .toBe(false)

    expect($scrollview.state.locations[0]).toMatchObject({
      position: { top: 0, bottom: 0 },
      scrollview: SV_ID,
      component: 'testKey'
    })
  })


  it('Can remove scrollviews & scroll components from tracking', () => {
    const ScrollComp = Vue.extend({
      render(h) {
        return h('p', 'test scroll component')
      }
    })


    const Ctor = Vue.extend({
      render(h) {
        return h(
          'Scroll-view',
          {
            scopedSlots: {
              default: (props) => h(ScrollComp, { key: 'testKey' } )
            },
            props: {
              tag: 'div'
            },
            ref: 'testScrollview'
          }
        )
      }
    })

    Ctor.use(ScrollView)
    const vm = new Ctor().$mount()

    const SV_ID = vm.$refs.testScrollview._uid

    expect($scrollview.state.scrollviews[SV_ID])
      .toBeInstanceOf(Vue)

    vm.$destroy()

    expect($scrollview.state.scrollviews[SV_ID])
      .toBeUndefined()

    expect($scrollview.state.locations)
      .toEqual([])

    expect($scrollview.state.tracking)
      .toEqual({})

  })

  it('Can receive update tracking event', () => {
    const ScrollComp = Vue.extend({
      render(h) {
        return h('p', 'test scroll component')
      }
    })


    const Ctor = Vue.extend({
      render(h) {
        return h(
          'Scroll-view',
          {
            scopedSlots: {
              default: (props) => h(ScrollComp, { key: 'testKey' } )
            },
            props: {
              tag: 'div'
            },
            ref: 'testScrollview'
          }
        )
      }
    })

    Ctor.use(ScrollView)
    const vm = new Ctor().$mount()
    const s_vm = vm.$refs.testScrollview


    expect(s_vm.$data.tracking)
      .toEqual({ testKey: false })

    s_vm.$emit('tracking:update', { testKey: true })

    expect(s_vm.$data.tracking)
      .toEqual({ testKey: true })
  })

  it('Adds the scroll listener', () => {
    const ScrollComp = Vue.extend({
      render(h) {
        return h('p', 'test scroll component')
      }
    })


    const Ctor = Vue.extend({
      render(h) {
        return h(
          'Scroll-view',
          {
            scopedSlots: {
              default: (props) => h(ScrollComp, { key: 'testKey' } )
            },
            props: {
              tag: 'div'
            },
            ref: 'testScrollview'
          }
        )
      }
    })

    Ctor.use(ScrollView)
    const vm = new Ctor().$mount()


    expect(typeof $scrollview.state.scrollListener)
      .toBe('function')
  })

})
