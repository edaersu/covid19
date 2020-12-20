const OFF = 0;
const WARNING = 1;
const ERROR = 2;

const parserOptions = {
  tsconfigRootDir: __dirname,
  project: './tsconfig.json',
};

module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  plugins: ['prettier', 'import', 'jest'],

  globals: {
    REACT_APP_ENV: true,
  },

  env: {
    node: true,
    browser: true,
  },

  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/naming-convention': OFF,
    'import/no-extraneous-dependencies': WARNING,
    'import/no-named-as-default': OFF,
    'jsx-a11y/label-has-associated-control': OFF,
    'jsx-a11y/label-has-for': OFF,
    'jsx-a11y/media-has-caption': OFF,
    'no-loop-func': OFF,
    'no-nested-ternary': OFF,
    'no-param-reassign': OFF,
    'no-plusplus': OFF,
    'no-bitwise': OFF,
    'no-return-assign': OFF,
    'no-underscore-dangle': OFF,
    'no-unused-expressions': OFF,
    'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'max-classes-per-file': OFF,
    'global-require': OFF,
    'prettier/prettier': ERROR,
    'react/jsx-filename-extension': OFF,
    'react/prop-types': OFF,
    'react/require-default-props': OFF,
  },

  parserOptions,
  root: true,
};
