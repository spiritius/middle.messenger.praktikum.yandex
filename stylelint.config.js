/** @type {import('stylelint').Config} */
export default {
  'extends': ['stylelint-config-standard', 'stylelint-config-standard-scss'],
  fix: true,
  rules: {
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': null,
    'no-descending-specificity': null
  },
  'ignoreFiles': [
    'build/*'
  ]
};
