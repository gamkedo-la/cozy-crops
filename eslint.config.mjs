import globals from "globals"
import pluginJs from "@eslint/js"

export default [
  {
    files: ["**/*.js"], // Include all JavaScript files in the project
    languageOptions: { globals: globals.browser },
    rules: {
      semi: ["error", "never"],
      "space-before-function-paren": ["error", "always"], // Require space before function parenthesis
      "keyword-spacing": ["error", { "before": true, "after": true }], // Require space before and after keywords
      quotes: ["error", "single"], // Require single quotes for strings,
      indent: ["error", 2], // Use 2 spaces for indentation
    }
  },
  pluginJs.configs.recommended,
]