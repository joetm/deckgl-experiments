var debug = true; // process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  context: path.join(__dirname, "src"),
  entry: [
    'whatwg-fetch', // AJAX fetch polyfill - https://github.com/github/fetch
    "./entry.js"
  ],
  output: {
    // path: path.join(__dirname, "dist/js/"),
    path: path.resolve('./build'),
    filename: "bundle.js"
  },
  devtool: debug ? "source-map" : null, //"inline-sourcemap"
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|projects)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'], // , 'stage-0'
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      // {
      //   // make all files ending in .json5 use the `json5-loader`
      //   test: /\.json5$/,
      //   exclude: /(node_modules|bower_components|projects)/,
      //   loader: 'json5-loader'
      // },
      {
        test: /\.json$/,
        // exclude: /(node_modules|bower_components)/,
        loader: 'json-loader'
      },
      // fonts and svg
      // { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      // { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      // images
      {
        test: /\.(ico|jpe?g|png|gif)$/,
        loader: "file"
      },
      {
        test: /\.scss$/,
        exclude: [ /node_modules/ ],
        loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss!sass?sourceMap&outputStyle=expanded")
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'components'
    ]
  },
  // using enzyme with webpack
  // see https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  plugins: debug ? [] : [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    // new CopyWebpackPlugin([
    //   {from: './data', to: './data'},
    //   {from: './font', to: './font'}
    // ]),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  	new webpack.optimize.UglifyJsPlugin({
        //sourcemap: true,
        //mangle: false,
        compress: {
            warnings: false
        }
     })
  ]
};
