const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const output = {
  filename: 'js/[name].[chunkhash].js',
  chunkFilename: 'js/[name].[chunkhash].js',
};

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[name].[contenthash].css',
  }),
];

module.exports = {
  output,
  plugins,
};
