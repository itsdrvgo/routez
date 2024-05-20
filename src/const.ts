import path from "path";
import { isCjs } from "./methods.js";

export const IS_ESM = !isCjs();
export const MODULE_IMPORT_PREFIX = IS_ESM ? "file://" : "";

export const DEFAULT_ROUTER_DIRECTORY = "app";

export const CJS_MAIN_FILENAME =
    typeof require !== "undefined" && require.main?.filename;

export const PROJECT_DIRECTORY = CJS_MAIN_FILENAME
    ? path.dirname(CJS_MAIN_FILENAME)
    : process.cwd();

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
