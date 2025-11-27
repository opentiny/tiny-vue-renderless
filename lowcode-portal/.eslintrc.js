module.exports = {
  env: {
    browser: true,
    es2015: true,
    node: true,
    jest: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/eslint-config-standard'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    babelOptions: {
      parserOpts: {
        plugins: ['jsx']
      }
    }
  },
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'newline-before-return': 'error',
    'newline-after-var': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'function', next: '*' }
    ],
    'vue/multi-word-component-names': 0
  }
}
