const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [

      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/

      },
      {
        test:/\.(s*)css$/,
        use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
        })
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            }
        }]
      }
    ]
  },
  plugins: [
  new ExtractTextWebpackPlugin('style.css'),
  new HtmlWebpackPlugin({
    hash: false,
    template: "./index.html"
  }),

  ],
  node: { //let's you use file system
    fs: 'empty'
  }
};

module.exports = config
