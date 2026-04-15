import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  {
    rules: {
      "semi": ["error", "always"],
      "semi-spacing": "error",
	    "no-unused-vars": "error",
      "comma-dangle": ["error", "always-multiline"],
    },
  },
]);
