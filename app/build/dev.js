const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const output = {
  filename: 'js/[name].js',
  chunkFilename: 'js/[name].js',
};

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: 'css/[name].css',
  }),
];

module.exports = {
  output,
  plugins,
};
