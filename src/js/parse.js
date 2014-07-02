var fs = require('fs')
var path = require('path')
var mocha = require('mocha')
require('coffee-script/register')
mocha.interfaces['wdd'] = require('./wdd-interface')
assert = require('better-assert')

module.exports = function(filePath) {
  m = new mocha()

  m.ui('wdd')
  //m.reporter('spec')
  m._reporter = require('./wdd-reporter') 
  m.addFile(filePath)

  // Parse the file so we can get the list of suites and tests.
  m.loadFiles()

  // If we don't do this before running the suite, everything will get 
  // loaded twice...
  m.files = []

  // Print out all suites and tests
  if (m.suite.suites.length > 0) {    
    for (var j in m.suite.suites) {
      console.log('  - ' + m.suite.suites[j].title)
    
      for (var k in m.suite.suites[j].tests) {
        console.log('    - ' + m.suite.suites[j].tests[k].title)
      }
    }
  } else {
    for (var i in m.suite.tests) {
      console.log('  - ' + m.suite.tests[i].title)
    }
  }
}