const webpack = require('webpack');
const Merge = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const common = require('./build/common');
const dev = require('./build/dev');
const prod = require('./build/prod');
const config = require('./project.config');

const env = process.env.APP_ENV;
const { outputDir, proxy } = config;

const smp = new SpeedMeasurePlugin();
module.exports = () => {
  let result;

  if (env === 'dev') {
    const devServerOption = {
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
      ],
      devServer: {
        hot: true,
        port: 8080,
        open: true,
        proxy,
        inline: true,
        compress: true,
        contentBase: outputDir,
        historyApiFallback: true,
      },
      devtool: '#source-map',
    };

    result = Merge(common, dev, devServerOption);
  } else if (dev === 'test') {
    result = Merge(common, dev);
  } else if (dev === 'prod') {
    result = Merge(common, prod);
  }

  return smp.wrap(result);
};
