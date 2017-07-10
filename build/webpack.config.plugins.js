'use strict'

const webpack = require('webpack')

const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

exports.commonPlugins = ({ isDev, entryPoints }) => [

  // global constants, replacing each occurrence with given value
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
    '__DEV__': JSON.stringify(isDev)
  }),

  // common chunk, containing code shared between all entry points
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: Object.keys(entryPoints)
  }),

  // vendor chunk, externalizing code required by all entry points
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  }),

  // export JSON file that maps chunk IDs to resulting asset files,
  // allows long-term caching by ensuring the vendor chunk doesn't
  // change when the application code itself changes
  new ChunkManifestPlugin({
    filename: 'manifest.json',
    manifestVariable: 'webpackManifest'
  })

]

exports.htmlPlugins = ({ entryPoints, template }) => {
  return Object.keys(entryPoints).map(entryPointName => new HtmlPlugin({
    chunks: ['vendor', 'common', entryPointName],
    title: entryPoints[entryPointName].title,
    filename: `${entryPointName}.html`,
    template,
    inject: true,
    hash: true
  }))
}

exports.productionBuildPlugins = ({ useSourceMap }) => [

  // run UglifyJS to minimize application code
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: useSourceMap
  }),

  // try to keep generated chunk size above the given limit
  // by merging several smaller chunks together
  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 512000 // 512 kB
  }),

  // extract all CSS from the bundle into a separate file
  // that will be loaded in parallel to application code
  new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    allChunks: true
  })

]
