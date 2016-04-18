// const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

/**
 * Entry
 * Reference: http://webpack.github.io/docs/configuration.html#entry
 * Should be an empty object if it's generating a test build
 * Karma will set this when it's a test build
 */

  output: {
    // Absolute output directory
    path: __dirname,
    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: '',
    // Filename for entry points
    // Only adds hash in build mode
    filename: '[name].[hash].js',
    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: '[name].[hash].js',
  },

  devtool: 'inline-source-map',

  // Initialize module
  module: {
    preLoaders: [],
    loaders: [{
      test: /\.es6$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.jsx$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.ts$/,
      loadler: 'ts',
      exclude: /node_modules/,
    }, {
      test: /\.tsx$/,
      loadler: 'ts',
      exclude: /node_modules/,
    }, {
      // Copy files to output,
      // Rename the file using the asset hash,
      // Pass along the updated reference to your code.
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './examples/map.html',
      inject: 'body',
      chunks: ['map'],
      filename: 'map.html',
    }),
  ],
  devServer: {
    contentBase: '',
    stats: {
      modules: true,
      cached: true,
      colors: true,
    },
    hot: true,
  },
};
