module.exports = {
  root: true,
  extends: ['stylelint-config-standard-vue', 'stylelint-config-prettier'],
  rules: {
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep']
      }
    ]
  }
}
