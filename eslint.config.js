import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    prettier,
    ...tseslint.configs.recommended,
    {
        rules: {
            semi: "error",
        },
        ignores: ["build", "test", "node_modules"],
    },
];
