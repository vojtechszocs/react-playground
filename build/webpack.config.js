'use strict'

// https://webpack.js.org/configuration/

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const CleanPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const moduleTypes = require('./module-types')
const loaders = require('./webpack.config.loaders')
const plugins = require('./webpack.config.plugins')
const utils = require('./webpack.config.utils')

const baseDir = path.normalize(path.resolve(__dirname, '..'))
const srcDir = `${baseDir}/src`
const buildDir = `${baseDir}/build`
const staticDir = `${baseDir}/static`
const toolsDir = `${baseDir}/tools`
const distDir = `${baseDir}/dist`

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

const packageInfo = require(`${baseDir}/package.json`)
const useSourceMap = true // use source maps for all builds
const devServerPort = 9000

// definition of entry points, one per each application
const entryPoints = {
  'vanilla-react': {
    entry: './vanilla-react.app.jsx',
    title: 'Vanilla React App'
  },
  'react-redux': {
    entry: './react-redux.app.jsx',
    title: 'React App with Redux'
  },
  'react-redux-saga': {
    entry: './react-redux-saga.app.jsx',
    title: 'React App with Redux and Saga'
  }
}

// basic build configuration
const baseConfig = {

  // base directory for resolving entry point paths
  context: srcDir,

  // entry points, each one represented by a separate bundle
  entry: utils.webpackEntry({
    entryPoints,
    // put all mandatory vendor modules here
    vendorModules: ['babel-polyfill']
  }),

  // compilation output settings
  output: {
    path: distDir,
    publicPath: `http://localhost:${devServerPort}/`,
    filename: isDev ? '[name].js' : '[name].[hash].js',
    chunkFilename: isDev ? '[id].js' : '[id].[contenthash].js',
    pathinfo: isDev
  },

  // configure output for use with developer tooling
  // note: always prefer `source-map` option for production builds
  devtool: isDev ? 'cheap-source-map' : 'source-map',

  // customize how webpack resolves modules
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '*']
  },

  // configure how webpack treats different kinds of modules
  module: {

    rules: [
      {
        test: moduleTypes.js,
        include: srcDir,
        use: loaders.jsLoaders()
      },
      {
        test: moduleTypes.css,
        use: isDev
          ? loaders.cssLoadersForDevelopment({ useSourceMap })
          : loaders.cssLoadersForProduction({ useSourceMap })
      },
      {
        test: moduleTypes.imageAndFont,
        use: loaders.imageAndFontLoaders()
      }
    ]

  },

  // webpack plugins to enhance the compilation
  plugins: [

    // apply common plugins, defining common and vendor chunks
    ...plugins.commonPlugins({ isDev, entryPoints }),

    // clean build output directory
    new CleanPlugin([distDir], {
      root: baseDir,
      verbose: isDev
    }),

    // copy static files into build output directory
    new CopyPlugin([
      { from: staticDir }
    ]),

    // generate HTML page for each entry point
    ...plugins.htmlPlugins({
      entryPoints,
      template: `${buildDir}/app-index.html.ejs`
    })

  ]

}

// adapts to development build configuration
const devConfig = webpackMerge(baseConfig, {

  // additional plugins used for development
  plugins: [

    // prevent webpack from watching specific files
    new webpack.WatchIgnorePlugin([
      `${toolsDir}/test-data.json`
    ])

  ],

  // configure webpack dev-server
  devServer: {
    publicPath: baseConfig.output.publicPath,
    contentBase: staticDir,
    port: devServerPort,
    compress: true,
    overlay: true
  }

})

// adapts to production build configuration
const prodConfig = webpackMerge(baseConfig, {

  // additional plugins used for production
  plugins: [

    // apply the usual production build plugins
    ...plugins.productionBuildPlugins({ useSourceMap }),

    // emit banner comment at the top of each generated chunk
    new webpack.BannerPlugin({
      banner: `${packageInfo.name} v${packageInfo.version}`
    })

  ]

})

module.exports = isDev ? devConfig : prodConfig
