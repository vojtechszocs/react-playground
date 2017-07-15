'use strict'

// https://facebook.github.io/jest/docs/en/configuration.html

const path = require('path')

const moduleTypes = require('./module-types')

const baseDir = path.normalize(path.resolve(__dirname, '..'))
const srcDir = `${baseDir}/src`
const buildDir = `${baseDir}/build`

module.exports = {

  // base directory for resolving tests and modules
  rootDir: srcDir,

  // define test files using glob patterns
  testMatch: ['**/*.test.js'],

  // driven by webpack configuration (resolve.modules)
  moduleDirectories: ['node_modules'],

  // driven by webpack configuration (resolve.extensions)
  moduleFileExtensions: ['js', 'jsx', 'json'],

  // mock specific modules, based on regular expression
  moduleNameMapper: {
    [moduleTypes.css.source]: 'identity-obj-proxy', // for mocking CSS Modules
    [moduleTypes.imageAndFont.source]: `${buildDir}/jest.mock.static-file.js`
  },

  // use jsdom to support DOM testing with Enzyme
  testEnvironment: 'jsdom',

  // driven by webpack configuration (DefinePlugin)
  globals: {
    '__DEV__': true
  }

}
