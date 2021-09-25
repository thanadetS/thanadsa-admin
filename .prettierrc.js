const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
};
