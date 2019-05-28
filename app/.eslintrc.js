module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentaObjectRestSpread: true,
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'standard', 
    'standard-react',
    'prettier',
    'plugin:compat/recommended',
  ],
  settings: {
    polyfills: ['fetch', 'promises', 'url']
  },
};
