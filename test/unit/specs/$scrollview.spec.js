import Vue from 'vue'
import ScrollView, { $scrollview } from '../../../src'

describe('$scrollview methods and properties', () => {

  beforeEach(() => {
    ScrollView(Vue)    
  })

  it('proxies onLastEntered callback to state object', () => {

    $scrollview.onLastEntered = () => 'test'

    const testFnString = "function () {return 'test';}"

    expect($scrollview.state.onLastEntered.toString()).toBe(testFnString)
    expect($scrollview.onLastEntered.toString()).toBe(testFnString)
    expect($scrollview._onLastEntered.toString()).toBe(testFnString)

  })

  it('Errors on attempted non-function assignment to onLastEntered', () => {
    const spy = {}
    spy.console = jest.spyOn(console, 'error').mockImplementation(() => {})

    $scrollview.onLastEntered = 'test'

    expect(console.error).toHaveBeenCalled()
    expect(spy.console.mock.calls[0][0])
      .toContain('[vue-scrollview]: onLastEntered expects a function.')
  })

})