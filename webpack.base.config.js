require('dotenv').config()

const path              = require('path'),
      webpack           = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// Plugins //
const extractHtml = new HtmlWebpackPlugin({
  template: path.join(__dirname, "app/index.html"),
  filename: 'index.html',
});

// Rules //
const jsRules = {
  test: /\.(js|jsx)$/,
  use: 'babel-loader',
  exclude: /node_modules/
};
const fileRules = {
  test: /\.(png|jpg|gif|svg|otf|eot|ttf|woff)$/,
  loader: 'file-loader',
  options: {
    name: "[name].[ext]",
    publicPath: "./assets",
    outputPath: './assets/',
  }
};

module.exports = {
  entry: ['./app/index.js', './app/assets/css/app.scss'],
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, "dist"),
    publicPath: '',
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      jsRules,
      fileRules
    ]
  },
  plugins: [
    extractHtml,
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: { '@': path.join(__dirname) }
  },
};
