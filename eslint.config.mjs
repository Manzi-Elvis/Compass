import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["**/dist/**", "**/node_modules/**", "**/.turbo/**", "**/coverage/**"] },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        // finds the nearest tsconfig.json for each file
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Packages expose only what their "exports" field allows (spec 6.5).
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@compass/*/src/*", "@compass/*/dist/*"],
              message: "Import from the package entry point, not its internals.",
            },
          ],
        },
      ],
    },
  },

  // Turn off stylistic rules that Prettier already owns. Keep this LAST.
  prettier,
);
