// CheckerPlugin can be removed once this issue is resolved:
// https://github.com/webpack/webpack/issues/3460
const { CheckerPlugin } = require('awesome-typescript-loader');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');
const errorOverlayMiddleware = require('react-error-overlay/middleware');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const productionConfig = require('./webpack.config.js');

const devConfig = {
  cache: true,

  // For server path
  output: {
    publicPath: '/',
    path: '/',
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath),
  },

  // For dev server
  devServer: {
    publicPath: '/',
    // For react-router's browserHistory
    historyApiFallback: {
      // Needed for handling react-router params that contain dots, i.e. raw deployment redirects:
      // https://github.com/ReactTraining/react-router/issues/3409#issuecomment-272023984
      disableDotRule: true,
    },
    setup(app) {
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
    },
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/,
    },
    overlay: false,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
  },

  entry: [
    require.resolve('babel-polyfill'),
    // Errors should be considered fatal in development
    require.resolve('react-error-overlay'),
    './src/index.tsx',
  ],

  module: {
    rules: [
      // For source maps
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      // For hot module reloading
      {
        test: /\.tsx?$/,
        exclude: /\.spec\.tsx?$/,
        use: {
          loader: require.resolve('awesome-typescript-loader'),
          options: {
            useBabel: true,
            useCache: true,
            babelOptions: {
              presets: ['es2015', 'react-hmre'],
              plugins: ['transform-regenerator'],
            },
          },
        },
      },
    ],
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    // For awesome-typescript-loader's async error reporting, i.e. watch mode
    new CheckerPlugin(),
    // Name the webpack modules
    new webpack.NamedModulesPlugin(),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
  ],

  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
};

module.exports = merge.smartStrategy({
  entry: 'replace',
})(productionConfig, devConfig);
