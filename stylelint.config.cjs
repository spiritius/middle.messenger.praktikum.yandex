/** @type {import('stylelint').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss'
  ],
  fix: true,
  rules: {
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'custom-property-empty-line-before': [
      'always', {
        except: ['after-custom-property']
      }
    ],
    'no-eol-whitespace': true,
    'declaration-colon-space-after': 'always-single-line',
    'length-zero-no-unit': true,
    'color-function-notation': 'modern',
    'alpha-value-notation': 'percentage',
    'string-quotes': 'double',
    'max-line-length': 200,
    'declaration-block-trailing-semicolon': 'always',
    'selector-list-comma-newline-after': 'always',
    'rule-empty-line-before': ['always', {
      except: ['first-nested']
    }],
    'selector-pseudo-element-colon-notation': 'double',
    'function-comma-space-after': 'always',
    'number-leading-zero': 'always',
    'scss/double-slash-comment-empty-line-before': ['always', {
      except: ['first-nested']
    }],
    'declaration-block-no-duplicate-properties': true,
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['popover-open']
    }]
  },
  ignoreFiles: [
    'build/*'
  ]
};
