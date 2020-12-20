const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  arrowParens: 'avoid',
  useTabs: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 100,
  overrides: [...fabric.prettier.overrides],
};
