module.exports = {
  extends: 'eslint:recommended',
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-proto': 0,
    'function-paren-newline': 0,
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error'
  },
  plugins: ['react']
};
