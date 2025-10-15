import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'  // updated import

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      stylistic, // updated plugin reference
    },
    rules: {
      'stylistic/indent': ['error', 2],           // updated rule names
      'stylistic/linebreak-style': ['error', 'unix'],
      'stylistic/quotes': ['error', 'double'],
      'stylistic/semi': ['error', 'always'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
]
