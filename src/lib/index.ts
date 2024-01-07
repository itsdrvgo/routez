import { readdirSync, statSync } from "fs";
import path from "path";
import { Express } from "express";
import {
    DEFAULT_ROUTER_DIRECTORY,
    MODULE_IMPORT_PREFIX,
    PROJECT_DIRECTORY,
    ROUTE_CONFIG,
} from "./const";
import {
    buildRoute,
    buildUrl,
    calculatePriority,
    getHandler,
    getMethodKey,
    isFileIgnored,
    isHandler,
    mergePaths,
    renderElement,
} from "./methods";
import { File, Route, RouterOptions } from "./types";

export async function createRouter(app: Express, options: RouterOptions = {}) {
    const files = fetchRoutes(
        options.directory ??
            path.join(PROJECT_DIRECTORY, DEFAULT_ROUTER_DIRECTORY)
    );

    const routes = await generateRoutes(files);

    for (const { exports, url } of routes) {
        const exportMethods = Object.entries(exports);

        for (const [method, handler] of exportMethods) {
            if (!handler) {
                throw new Error(
                    `Handler for method '${method}' in route '${url}' is undefined`
                );
            }

            const methodKey = getMethodKey(method) as keyof Express;
            const methodHandler = getHandler(handler);
            if (methodHandler.length === 0)
                throw new Error(
                    `Handler for method '${method}' in route '${url}' is invalid`
                );

            if (!ROUTE_CONFIG.DEFAULT_METHODS.includes(methodKey as string))
                continue;

            app[methodKey](url, ...methodHandler);
        }

        if (typeof exports.default !== "undefined") {
            if (isHandler(exports.default)) {
                app.get(url, (req, res) => {
                    const Page = exports.default;
                    renderElement(Page, req, res);
                });
            } else if (
                typeof exports.default === "object" &&
                isHandler(exports.default.default)
            ) {
                app.get(url, (req, res) => {
                    const Page = exports.default.default;
                    renderElement(Page, req, res);
                });
            }
        }
    }

    return app;
}

function fetchRoutes(directory: string, routes: string[] = []) {
    const results: File[] = [];

    for (const fileName of readdirSync(directory)) {
        const filePath = path.join(directory, fileName);
        const fileStats = statSync(filePath);

        if (fileStats.isDirectory()) {
            results.push(...fetchRoutes(filePath, [...routes, fileName]));
        } else {
            results.push({
                name: fileName,
                path: directory,
                rel: mergePaths(...routes, fileName),
            });
        }
    }

    return results;
}

async function generateRoutes(files: File[]) {
    const routes: Route[] = [];

    for (const file of files) {
        const parsedFile = path.parse(file.rel);

        if (isFileIgnored(parsedFile)) continue;

        const route = buildRoute(parsedFile);
        const url = buildUrl(route);
        const priority = calculatePriority(url);

        const exports = await import(
            MODULE_IMPORT_PREFIX + path.join(file.path, file.name)
        );

        if (parsedFile.name.startsWith("route") && exports.default)
            throw new Error(
                `Route '${route}' must not have a default export, default exports are reserved for page routes`
            );

        if (parsedFile.name.startsWith("page")) {
            if (!exports.default || exports.default.name !== "Page")
                throw new Error(
                    `Route '${route}' must have a default export of type Page`
                );

            const hasValidMethods = ROUTE_CONFIG.DEFAULT_METHODS.some(
                (method) =>
                    exports[method.toUpperCase()] &&
                    typeof exports[method.toUpperCase()] === "function"
            );
            if (hasValidMethods)
                throw new Error(
                    `Route '${route}' is a page route and must not contain any methods, only a default export of type Page`
                );
        }

        routes.push({
            url,
            priority,
            exports,
        });
    }

    return routes.sort((a, b) => a.priority - b.priority);
}
