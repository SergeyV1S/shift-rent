import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["off"],
      "react/prop-types": ["off"],
      "@typescript-eslint/no-unused-expressions": ["off"],
      "@typescript-eslint/no-non-null-assertion": ["off"],
      "no-undef": ["off"],
      "no-unused-vars": ["off"],
      "no-var": ["error"],
      "no-console": ["warn"],
      "no-shadow": ["error"],
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-empty-interface": ["off"],
      "@typescript-eslint/no-empty-function": ["error"],
      "arrow-body-style": ["error", "as-needed"],
      "@typescript-eslint/no-empty-object-type": ["off"],
      "react-hooks/exhaustive-deps": ["off"],
      "no-useless-catch": ["off"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports"
        }
      ],
      "no-restricted-imports": [
        "warn",
        {
          patterns: ["../../"]
        }
      ]
    }
  }
);
