const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const postCssFlexbugsFixer = require('postcss-flexbugs-fixes');
const webpack = require('webpack');

const name = '[name]-[hash:8].[ext]';

/*
 * Get the webpack loaders object for the webpack configuration
 */
const rules = [
  {
    test: /\.tsx?$/,
    exclude: /\.spec\.tsx?$/,
    use: {
      loader: require.resolve('awesome-typescript-loader'),
      options: {
        useBabel: true,
        useCache: true,
        babelOptions: {
          presets: [
            // Make babel not transform modules since webpack 2 supports ES6 modules
            // This should allow webpack to perform tree-shaking.
            // TODO: Tree-shaking doesn't seem to work. Change tsconfig to
            // output ES6 modules once this is fixed:
            // https://github.com/webpack/webpack/issues/2867
            ['es2015', { modules: false }],
          ],
          // Needed in order to transform generators. Babelification can be removed
          // once TypeScript supports generators, probably in TS 2.3.
          // When that is done, also change the output of TS to 'es5' in tsconfig.json
          plugins: ['transform-regenerator'],
        },
      },
    },
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name,
        },
      },
    ],
  },
  {
    test: /\.(jpeg|jpg|gif|png|eot|woff2|woff|ttf)$/,
    use: [
      {
        loader: require.resolve('file-loader'),
        options: {
          name,
        },
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: true,
          importLoaders: 2,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
          plugins: () => [
            postCssFlexbugsFixer,
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
      require.resolve('sass-loader'),
    ],
  },
  {
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
          plugins: () => [
            postCssFlexbugsFixer,
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
    ],
  },
];

const htmlWebpackPluginConfig = {
  template: require.resolve(`${__dirname}/src/index-template.tsx`),
  inject: false,
  filename: 'index.html',
};

const config = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    strictExportPresence: true,
    rules,
  },
  output: {
    filename: 'index-[hash].js',
    path: path.resolve('/'),
    publicPath: '/',
  },
  entry: [require.resolve('babel-polyfill'), './src/index.tsx'],
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

if (['production', 'staging'].indexOf(process.env.NODE_ENV) > -1) {
  config.bail = true;
  config.plugins = config.plugins.concat([
    // LopaderOptionsPlugin with minimize:true will be removed in Webpack 3.
    // Will need to add minimize: true to loaders at that point.
    // See https://webpack.js.org/guides/migrating/#uglifyjsplugin-minimize-loaders
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    // Minify the code.
    // TODO: Switch to BabiliPlugin in order to get tree-shaking at some point.
    // It understands ES6 imports while (as of now) UglifyJs doesn't.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // This feature has been reported as buggy a few times, such as:
        // https://github.com/mishoo/UglifyJS2/issues/1964
        // We'll wait with enabling it by default until it is more solid.
        reduce_vars: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
  ]);
}

module.exports = config;
