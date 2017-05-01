'use strict'

// https://webpack.js.org/configuration/

const path = require('path')
const webpack = require('webpack')

const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

const baseDir = path.normalize(path.resolve(__dirname, '..'))
const srcDir = `${baseDir}/src`
const buildDir = `${baseDir}/build`
const staticDir = `${baseDir}/static`
const distDir = `${baseDir}/dist`

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'
const isDev = env === 'development'

// use source maps for all builds
const useSourceMap = true

const packageInfo = require(`${baseDir}/package.json`)
const apiServerPort = 3000
const devServerPort = 9000

// application entry points, relative to webpack context
const appEntryPoints = {
  'vanilla': './vanilla-react-app.jsx',
  'react-redux-saga': './react-redux-saga-app.jsx'
}

// HtmlPlugin instance creator for a specific entry point
function htmlPluginInstance ({ title, filename, entryChunk }) {
  return new HtmlPlugin({
    title,
    filename,
    chunks: ['vendor', 'common', entryChunk],
    template: `${buildDir}/app-index.html.ejs`,
    inject: true,
    hash: true
  })
}

// common configuration applicable to all environments
const config = module.exports = {

  // base directory for resolving paths in entry points
  context: srcDir,

  // entry points, each one represented by a separate bundle
  entry: Object.assign({
    'vendor': ['babel-polyfill'] // add 3rd party modules here
  }, appEntryPoints),

  // compilation output settings
  output: {
    path: distDir,
    publicPath: `http://localhost:${devServerPort}/`,
    filename: isDev ? '[name].js' : '[name].[hash].js',
    chunkFilename: isDev ? '[id].js' : '[id].[contenthash].js',
    pathinfo: isDev
  },

  // configure output for use with developer tooling, always prefer
  // the `source-map` option for production builds
  devtool: isDev ? 'cheap-module-eval-source-map ' : 'source-map',

  // customize how webpack resolves modules to be part of the bundle
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },

  // settings applied to normal webpack modules
  module: {

    rules: [
      {
        test: /\.jsx?$/,
        include: srcDir,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        include: srcDir,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: isDev ? [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: useSourceMap,
              // https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDev ? '[name]_[local]_[hash:base64]' : '[hash:base64]',
              minimize: isProd
            }
          }
        ] : ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          // return data URL if the file is smaller than given limit
          limit: 10000 // 10 kB
        }
      }
    ]

  },

  // webpack plugins to enhance the compilation
  plugins: [

    // global constants, replace each occurrence with expression
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      '__DEV__': JSON.stringify(isDev)
    }),

    // common chunk, containing code shared between entry points
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: Object.keys(appEntryPoints)
    }),

    // explicit vendor chunk, excluding application-specific code
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),

    // export JSON file that maps chunk IDs to resulting asset files,
    // allows long-term caching by ensuring the vendor chunk doesn't
    // change when the application code itself (=> `hash`) changes
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest'
    }),

    // clean build output directory
    new CleanPlugin([distDir], {
      root: baseDir,
      verbose: isDev
    }),

    // generate an HTML page for each entry point
    htmlPluginInstance({
      title: `Vanilla React App`,
      filename: 'vanilla.html',
      entryChunk: 'vanilla'
    }),
    htmlPluginInstance({
      title: `React App with Redux & Saga`,
      filename: 'react-redux-saga.html',
      entryChunk: 'react-redux-saga'
    }),

    // copy static files into build output directory
    new CopyPlugin([
      { from: staticDir }
    ]),

    // options shared by all webpack loaders
    new webpack.LoaderOptionsPlugin({
      debug: isDev,
      minimize: isProd
    })

  ]

}

// development build configuration
if (isDev) {
  config.devServer = {

    publicPath: config.output.publicPath,
    contentBase: staticDir,
    port: devServerPort,
    compress: true,
    overlay: true,
    // proxy URLs to API server through webpack dev-server
    proxy: {
      '/api': {
        target: `http://localhost:${apiServerPort}`,
        pathRewrite: { '^/api': '' }
      }
    }

  }
}

// production build configuration
if (isProd) {
  config.plugins.push(

    // run UglifyJS to minimize application's assets
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: useSourceMap,
      compress: {
        warnings: isDev
      }
    }),

    // try to keep generated chunk size above the given limit
    // by merging several smaller chunks together
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 512000 // 512 kB
    }),

    // extract all CSS from the bundle into a separate file
    // that will be loaded in parallel to the application code
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    }),

    // emit banner comment at the top of each generated chunk
    new webpack.BannerPlugin({
      banner: `${packageInfo.name} v${packageInfo.version}`
    })

  )
}
