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
      .execute("window.scrollTo(0, 2000)")
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
      .execute("window.scrollTo(0, 7510)")
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
      .execute("window.scrollTo(0,1610)")
      .pause(500)
      .assert.cssClassNotPresent('.visibility-marker.b', 'visible')
      .pause(500)
      .execute("window.scrollTo(0,1780)")
      .pause(500)
      .assert.cssClassPresent('.visibility-marker.b', 'visible')
  },
  'test top viewport offset visibility (default offset)': function (browser) {
    browser
      .execute("window.scrollTo(0,0)")
      .execute("window.scrollTo(0,1110)")
      .pause(500)      
      .assert.cssClassPresent('.visibility-marker.a', 'visible')
      .execute("window.scrollTo(0, 1210)")
      .pause(500)
      .assert.cssClassNotPresent('.visibility-marker.a', 'visible')
           
  },
  'test dynamic offsets': function (browser) {
    browser
      .execute("window.scrollTo(0,1010)")
      .pause(500)
      .assert.cssClassPresent('.visibility-marker.a', 'visible')
      .click('.set-offset')
      .pause(200)
      .execute("window.scrollTo(0,1060)")
      .pause(500)
      .assert.cssClassNotPresent('.visibility-marker.a', 'visible')
  },
  'scroll direction is properly calculated': function (browser) {
    browser
      .execute("window.scrollTo(0,0)")
      .execute("window.scrollTo(0, 1)")
      .click('.scroll-direction')
      .pause(200)
      .assert.cssClassPresent('.test', 'scrollingDown')
      .execute("window.scrollTo(0,0)")
      .pause(200)
      .click('.scroll-direction')
      .pause(200)
      .assert.cssClassPresent('.test', 'scrollingUp')
  },
  'automatic element location recaching on scroll height change': function (browser) {
    browser
      .execute("window.scrollTo(0,0)")
      .execute("window.scrollTo(0, 2120)")
      .pause(200)
      .assert.cssClassPresent('.visibility-marker.b', 'visible')   
      .click('.change-height')
      .execute("window.scrollTo(0, 2120)")
      .pause(1000)
      .assert.cssClassNotPresent('.visibility-marker.b', 'visible')      
  },
  'lastComponentEntered callback fires on last component entering': function  (browser) {
    browser
      .execute("window.scrollTo(0,0)")
      .pause(200)
      .execute("window.scrollTo(0, 20000)")
      .pause(200)
      .assert.cssClassPresent('.test', 'lastEntered')
      .end()
  }
}
