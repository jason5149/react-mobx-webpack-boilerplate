const webpack = require('webpack');
const os = require('os');
const path = require('path');
const Happypack = require('happypack');
const Webpackbar= require('webpackbar');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniExtractPlugin = require('mini-css-extract-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('../project.config');

const mode = process.env.NODE_ENV;
const env = process.env.APP_ENV;
const { outputDir, publicPath, alias } = config;

const entry = {
  vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react'],
  bundle: './src/main.js',
};

const output = {
  path: outputDir,
  publicPath,
};

const rules = [
  {
    test: /\.(js|jsx)$/,
    use: ['babel-loader'],
    include: [path.resolve('src')],
    exclude: [path.resolve('node_modules')],
  },
  {
    test: /\.js$/,
    enforce: 'pre',
    loader: 'source-map-loader',
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniExtractPlugin.loader,
      'css-loader',
      { loader: 'postcss-loader', options: { config: { path: 'postcss.config.js' } } },
      'sass-loader',
    ],
  },
  {
    test: /\.(jpe?p|png|gif|bmp)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
];

const resolve = {
  extensions: ['.js', '.jsx', '.json'],
  alias,
};

const optimization = {
  runtimeChunk: 'single',
  minimizer: [
    new TerserPlugin({
      cache: true,
      parallel: true,
      terserOptions: {
        ecma: 6,
        mangle: true,
        output: {
          comments: false,
        }
      },
      sourceMap: true,
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        safe: true
      },
    }),
  ],
  splitChunks: {
    cacheGroups: {
      vendors: {
        name: 'vendors',
        test: modules => /react|react-dom|react-router-dom|mobx|mobx-react|history|scheduler|process|value-equal|object-assign|prop-types|regenerator-runtime|resolve-pathname|buildin|fastclick\/lib|react-transition-group/.test(modules.context),
        chunks: 'initial',
        priority: 10,
      },
      babels: {
        name: 'babels',
        test: modules => /@babel\/polyfill|es6-promise|core-js|babel-runtime/.test(modules.context),
        chunks: 'initial',
        priority: 2,
      },
    },
  },
};

const performance = {
  hints: false,
};

const plugins = [
  new webpack.DefinePlugin({
    APP_ENV: JSON.stringify(env),
  }),
  new webpack.NamedChunksPlugin(),
  new Webpackbar(),
  new Happypack({
    id: 'happy-babel-js',
    loaders: ['babel-loader?cacheDirectory=true'],
    threadPool: Happypack.ThreadPool({
      size: os.cpus().length,
    }),
  }),
  new CleanPlugin({
    dry: true,
    verbose: true,
    cleanOnceBeforeBuildPatterns: [outputDir],
  }),
  new HtmlPlugin({
    filename: `${ outputDir }/index.html`,
    template: path.resolve('public', 'index.ejs'),
    env,
  }),
  new ParallelUglifyPlugin({
    cacheDir: '.cache/',
    uglifyJS: {
      output: {
        beautify: env === 'production',
        comments: false,
      },
      compress: {
        // warnings: false,
        drop_console: env === 'production',
        collapse_vars: false,
        reduce_vars: false,
      },
    },
  }),
];

module.exports = {
  mode,
  entry,
  output,
  module: {
    rules,
  },
  resolve,
  optimization,
  performance,
  plugins, 
};
