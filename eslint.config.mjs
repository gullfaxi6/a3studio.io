import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

/**
 * Configuration ESLint (flat) — Next.js + React + React Hooks + TypeScript.
 * Une seule règle stylistique est désactivée : `react/no-unescaped-entities`,
 * car le contenu est en français (apostrophes typographiques rendues correctement) ;
 * cette règle n'apporte aucune garantie de correction et générerait un bruit massif.
 */
export default tseslint.config(
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },

  // Base JavaScript
  js.configs.recommended,

  // Code applicatif TypeScript + React
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/prop-types": "off", // typage assuré par TypeScript
      "react/no-unescaped-entities": "off", // contenu FR (apostrophes), voir en-tête
    },
  },

  // Fichiers de configuration / scripts Node (ESM)
  {
    files: ["**/*.mjs", "scripts/**/*.{js,mjs}"],
    languageOptions: { globals: { ...globals.node } },
  },
);
