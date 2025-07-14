import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import react from "eslint-plugin-react"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import jsxA11Y from "eslint-plugin-jsx-a11y"
import _import from "eslint-plugin-import"
import tsParser from "@typescript-eslint/parser"

export default [
  {
    ignores: ["dist", "vite.config.ts", "tsup.config.ts", "eslint.config.js", "vite-env.d.ts"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
      "@typescript-eslint": typescriptEslint,
      "jsx-a11y": jsxA11Y,
      import: _import,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...typescriptEslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "error",
      indent: ["error", "tab"],
      quotes: ["error", "double"],
      semi: ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "comma-dangle": ["error", "never"],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "./*",
            "../*"
          ]
        }
      ],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off"
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
      },
      react: {
        version: "detect",
      },
    },
  },
]
