'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.jsLoaders = () => [
  {
    loader: 'babel-loader',
    options: {
      presets: ['es2015', 'react'],
      plugins: ['transform-object-rest-spread']
    }
  }
]

const cssLoaders = ({ isDev, useSourceMap }) => [
  {
    loader: 'css-loader',
    options: {
      sourceMap: useSourceMap,
      modules: true, // enable CSS Modules
      localIdentName: isDev ? '[name]_[local]_[hash:base64]' : '[hash:base64]',
      minimize: !isDev && { // cssnano options
        autoprefixer: {
          add: true,
          remove: true
        }
      }
    }
  }
]

exports.cssLoadersForDevelopment = ({ useSourceMap }) => [
  'style-loader',
  ...cssLoaders({ isDev: true, useSourceMap })
]

exports.cssLoadersForProduction = ({ useSourceMap }) => ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: cssLoaders({ isDev: false, useSourceMap })
})

exports.imageAndFontLoaders = () => [
  {
    loader: 'url-loader',
    options: {
      // return data URL if the file size is below the given limit
      limit: 10000 // 10 kB
    }
  }
]
