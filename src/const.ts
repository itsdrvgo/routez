export const DEFAULT_ROUTER_DIRECTORY = "app";

export const PROJECT_DIRECTORY = process.cwd();

export const ROUTE_CONFIG = {
    VALID_FILE_EXTENSIONS: [".js", ".ts", ".mjs"],
    INVALID_NAME_SUFFIXES: [".d.ts"],
    IGNORE_PREFIX_CHAR: "_",
    DEFAULT_METHODS: [
        "get",
        "post",
        "put",
        "patch",
        "delete",
        "head",
        "connect",
        "options",
        "trace",
    ],
};
