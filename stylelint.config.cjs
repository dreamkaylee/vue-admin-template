module.exports = {
  root: true,
  extends: ['stylelint-config-standard-vue', 'stylelint-config-prettier'],
  rules: {
    'no-empty-source': null,
    'selector-class-pattern': [
      '^[5A-Za-z0-9-_]+$',
      {
        message: 'Expected class selector to be kebab-case'
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep']
      }
    ]
  }
}
