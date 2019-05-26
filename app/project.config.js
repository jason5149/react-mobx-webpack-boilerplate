const path = require('path');

const assetsRoot = path.resolve('dist');
const assetsPublicPath = '/';

module.exports = {
  outputDir: assetsRoot,
  publicPath: assetsPublicPath,
  proxy: {
    '/api': {
      target: 'http://localhost:9090',
      changeOrigin: true,
    },
  },
  alias: {
    '@': path.resolve('src'),
    '@api': path.resolve('src', 'api'),
    '@assets': path.resolve('src', 'assets'),
    '@components': path.resolve('src', 'components'),
    '@models': path.resolve('src', 'models'),
    '@pages': path.resolve('src', 'pages'),
    '@routes': path.resolve('src', 'routes'),
    '@styles': path.resolve('src', 'styles'),
    '@utils': path.resolve('src', 'utils'),
  },
};
