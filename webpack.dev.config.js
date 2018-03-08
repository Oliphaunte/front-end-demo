const merge         = require("webpack-merge"),
      path          = require('path'),
      webpack       = require('webpack');

const MagicImporter  = require('node-sass-glob-importer');

const BASE_CONFIG   = require("./webpack.base.config");

// Plugins //
const webpackEnv = new webpack.DefinePlugin({
  "process.env": {
    "NODE_ENV": JSON.stringify(process.env.ENV_DEV),
    "BASE_URL": JSON.stringify(process.env.BASE_URL_DEV)
  }
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
      path: 'app/assets/css/postcss.config.js'
    }
  }
};
const cssRules = { 
  test: /\.scss$/, 
  use: [
    "style-loader",
    "css-loader", 
    postcssRules,
    sassRules
  ],
};

module.exports = merge(BASE_CONFIG, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
    progress: true,
    noInfo: true,
    port: 3200
  },
  module: {
    rules: [
      cssRules
    ]
  },
  plugins: [
    webpackEnv,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});