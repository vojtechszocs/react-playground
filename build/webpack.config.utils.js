'use strict'

exports.webpackEntry = ({ entryPoints, vendorModules }) => {
  return Object.keys(entryPoints).reduce((acc, entryPointName) => {
    return Object.assign(acc, {
      [entryPointName]: entryPoints[entryPointName].entry
    })
  }, {
    'vendor': vendorModules
  })
}
