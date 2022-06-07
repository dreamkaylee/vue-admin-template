/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    "vue/setup-compiler-macros": true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: "latest"
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:import/recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier"
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["tsconfig.json", "tsconfig.config.json"]
      }
    }
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "import/no-unresolved": "off",
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: false },
        "newlines-between": "always",
        groups: ["builtin", "external", ["internal", "parent", "sibling", "index"], "unknown"],
        pathGroups: [],
        pathGroupsExcludedImportTypes: []
      }
    ],
    "vue/multi-word-component-names": "off"
  }
}
