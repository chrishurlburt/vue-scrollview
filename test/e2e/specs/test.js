// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'component entering visibility detected': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(1100, 900)
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .execute("window.scrollTo(0, 1000)")
      .pause(500)
      .assert.cssClassPresent('.visibility-marker.b', 'visible')
  },
  'component leaving visibility detected': function (browser) {
    browser
      .execute("window.scrollTo(0, 0)")
      .pause(500)
      .assert.cssClassNotPresent('.visibility-marker.b', 'visible')   
  },
  'can asynchronously add components to a scrollview and refresh': function (browser) {
    browser
      .click('.async-add-components')
      .pause(700)
      .execute("window.scrollTo(0, 6500)")
      .pause(500)
      .assert.cssClassPresent('.visibility-marker.f', 'visible')
  },
  'can scroll to a component by key': function (browser) {
    browser
      .execute("window.scrollTo(0,0)")
      .pause(500)
      .click('.scroll-by-key')
      .pause(500)
      .assert.cssClassPresent('.visibility-marker.c', 'visible')
  },
  'test bottom viewport offset visibility (default offset)': function (browser) {
    browser
      .execute("window.scrollTo(0,0)")
      .pause(500)
      .execute("window.scrollTo(0,600)")
      .pause(500)
      .assert.cssClassNotPresent('.visibility-marker.b', 'visible')
      .pause(500)
      .execute("window.scrollTo(0,770)")
      .pause(500)      
      .assert.cssClassPresent('.visibility-marker.b', 'visible')
  },
  'test top viewport offset visibility (default offset)': function (browser) {
    browser
      .execute("window.scrollTo(0,0)")
      .execute("window.scrollTo(0,100)")
      .pause(500)      
      .assert.cssClassPresent('.visibility-marker.a', 'visible')
      .execute("window.scrollTo(0, 200)")
      .pause(500)
      .assert.cssClassNotPresent('.visibility-marker.a', 'visible')
      .end()      
  }
}
