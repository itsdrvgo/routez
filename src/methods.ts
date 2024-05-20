import type { ParsedPath } from "path";
import { ROUTE_CONFIG } from "./const.js";
import type { MethodExport } from "./types.js";

export const IS_ESM = !isCjs();
export const MODULE_IMPORT_PREFIX = IS_ESM ? "file://" : "";

export function isCjs() {
    return typeof module !== "undefined" && !!module?.exports;
}

export function buildRoute(parsedFile: ParsedPath) {
    const directory = parsedFile.dir === parsedFile.root ? "" : parsedFile.dir;
    const name = parsedFile.name.startsWith("route")
        ? parsedFile.name.replace("route", "")
        : parsedFile.name;

    return directory + name;
}

export function buildUrl(path: string) {
    const url = convertParamSyntax(path);
    return url.replace(/:\.\.\.\w+/g, "*");
}

export function convertParamSyntax(path: string) {
    const subpaths: string[] = [];

    for (const subpath of path.split("/")) {
        subpaths.push(transformBrackets(subpath));
    }

    return mergePaths(...subpaths);
}

export function mergePaths(...paths: string[]) {
    return (
        "/" +
        paths
            .map((path) => path.replace(/^\/|\/$/g, ""))
            .filter((path) => path !== "")
            .join("/")
    );
}

export function transformBrackets(value: string) {
    const regBrackets = /\[([^}]*)\]/g;
    return regBrackets.test(value)
        ? value.replace(regBrackets, (_, s) => `:${s}`)
        : value;
}

export function calculatePriority(url: string) {
    const depth = url.match(/\/.+?/g)?.length || 0;
    const specifity = url.match(/\/:.+?/g)?.length || 0;
    const catchall = url.match(/\/\*/g)?.length || 0 > 0 ? Infinity : 0;

    return depth + specifity + catchall;
}

export function getMethodKey(method: string) {
    const key = method.toLowerCase();
    if (key === "del") return "delete";
    return key;
}

export function isFileIgnored(parsedFile: ParsedPath) {
    return (
        !ROUTE_CONFIG.VALID_FILE_EXTENSIONS.includes(
            parsedFile.ext.toLowerCase()
        ) ||
        ROUTE_CONFIG.INVALID_NAME_SUFFIXES.some((suffix) =>
            parsedFile.base.toLowerCase().endsWith(suffix)
        ) ||
        parsedFile.name.startsWith(ROUTE_CONFIG.IGNORE_PREFIX_CHAR) ||
        parsedFile.dir.startsWith(`/${ROUTE_CONFIG.IGNORE_PREFIX_CHAR}`)
    );
}

export function isHandler(handler: unknown): handler is MethodExport {
    return typeof handler === "function" || Array.isArray(handler);
}

export function getHandler(handler: MethodExport) {
    if (Array.isArray(handler) && handler.every((h) => typeof h === "function"))
        return handler;
    else if (typeof handler === "function") return [handler];
    else return [];
}
