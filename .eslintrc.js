module.exports = {
    plugins: ["@typescript-eslint", "unused-imports"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
    },
    root: true,
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    rules: {
        semi: "error",
        "unused-imports/no-unused-imports-ts": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
    },
    settings: {
        ignorePatterns: ["node_modules/", "assets/", "examples/"],
    },
};
