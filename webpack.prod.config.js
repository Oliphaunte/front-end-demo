const ExtractTextPlugin = require('extract-text-webpack-plugin');

const merge         = require("webpack-merge"),
      path          = require('path'),
      webpack       = require('webpack');

const MagicImporter  = require('node-sass-glob-importer');

const BASE_CONFIG   = require("./webpack.base.config");

// Plugins //
const webpackEnv = new webpack.DefinePlugin({
  "process.env": {
    "NODE_ENV": JSON.stringify(process.env.ENV_PROD),
    "BASE_URL": JSON.stringify(process.env.BASE_URL_PROD)
  }
});
const uglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  // sourceMap: true
});
const extractSass = new ExtractTextPlugin({
  filename: "index.bundle.css",
});

// Rules //
const sassRules = { 
  loader: "sass-loader",
  options: { 
    importer: MagicImporter()
  }
};
const postcssRules = { 
  loader: 'postcss-loader',
  options: {
    config: {
      path: './app/assets/css/postcss.config.js'
    }
  }
};
const cssRules = { 
  test: /\.scss$/, 
  use: extractSass.extract({
    use: [
      "css-loader", 
      postcssRules,
      sassRules
    ],
  })
};

module.exports = merge(BASE_CONFIG, {
  // devtool: 'source-map',
  module: {
    rules: [
      cssRules
    ]
  },
  plugins: [
    uglifyJsPluginConfig,
    extractSass,
    webpackEnv,
    new webpack.optimize.OccurrenceOrderPlugin(true),
  ]
});
