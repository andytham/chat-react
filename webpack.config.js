const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

const config = {
  entry: [
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
  new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
          }) //thanks to this issue in stack overflow: https://stackoverflow.com/questions/44934340/using-dotenv-module-with-react

  ],
  node: { //let's you use file system
    fs: 'empty'
  }
};

module.exports = config
