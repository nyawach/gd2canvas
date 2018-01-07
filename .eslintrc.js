module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    semi: 0,
    'space-before-function-paren': 0,
    'import/no-unresolved': [2, {
      ignore: ['^~']
    }],
  },
  globals: {
    window: true,
  },
}
