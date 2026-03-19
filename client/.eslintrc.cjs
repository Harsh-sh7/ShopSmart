module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["react", "react-refresh"],
  ignorePatterns: ["e2e/", "playwright.config.js"],
  settings: {
    react: { version: "18.2" },
  },
  overrides: [
    {
      files: ["**/*.test.jsx", "**/*.test.js", "src/setupTests.js"],
      env: { node: true },
      globals: { global: "readonly" },
    },
  ],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/prop-types": "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
