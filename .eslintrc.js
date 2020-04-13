module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/flowtype",
    "prettier/react",
    "plugin:react/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "eslint-comments",
    "flowtype",
    "jest",
    "react-native-globals",
    "import",
    "react",
    "react-hooks",
    "tanda",
    "react-native",
  ],
  rules: {
    /* Always dangle commas, there's no reason not to and it makes adding new stuff easier */
    "comma-dangle": ["error", "always"],
    /* State isn't needed in constructor */
    "react/state-in-constructor": 0,
    /* Two classes is fine */
    "max-classes-per-file": 0,
    /* I like prop spreading */
    "react/jsx-props-no-spreading": 0,
    /* flow doesn't understand numbers as keys on object, so quote them */
    "quote-props": [2, "as-needed", { numbers: true }],
    /* I should not be allowing console logs into production code */
    "no-console": 2,
    /* this rule prevents us cleanly expanding files in the future */
    "import/prefer-default-export": 0,
    /* enforce component type definitions at the top */
    "react/sort-comp": [
      2,
      {
        order: [
          "type-annotations",
          "static-methods",
          "lifecycle",
          "everything-else",
          "render",
        ],
      },
    ],
    /* enforce a convention for import ordering */
    "import/order": [
      "error",
      {
        groups: [
          "internal", // this is our types
          "builtin", // but shouldn't be used tbh
          "external",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
    /* flow can only be used in files marked as flow - removes 'forgot to set' errors */
    "flowtype/no-types-missing-file-annotation": 2,
    /* disallow `any`, `Object` and `Function` types */
    /* they don't provide a strict enough interface */
    "flowtype/no-weak-types": 2,
    /* no duplicate keys in type definitions */
    "flowtype/no-dupe-keys": 2,
    /* don't use primitive constructors as types */
    "flowtype/no-primitive-constructor-types": 2,
    /* enforce flow annotations - greenfield project where everything should be typed */
    "flowtype/require-valid-file-annotation": [
      2,
      "always",
      { annotationStyle: "block" },
    ],
    /* there are no 'valid hrefs' on mobile */
    "jsx-a11y/anchor-is-valid": 0,
    /* this is no longer a valid rule https://github.com/yannickcr/eslint-plugin-react/issues/1707 */
    "react/no-did-update-set-state": 0,
    /* if you disable an eslint rule, you must re-enable it */
    "eslint-comments/disable-enable-pair": 2,
    /* duplicate disables is probably a sign of a mistake */
    "eslint-comments/no-duplicate-disable": 2,
    /* if you're disabling a line, you need to specify which rule explicitly */
    "eslint-comments/no-unlimited-disable": 2,
    /* you should not keep lines disabled when they have no errors */
    "eslint-comments/no-unused-disable": 2,
    /* sanity check to ensure you're re-enabling the correct rules */
    "eslint-comments/no-unused-enable": 2,
  },
};
