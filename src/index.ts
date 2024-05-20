import { readdirSync, statSync } from "fs";
import path from "path";
import type { Express } from "express";
import {
    DEFAULT_ROUTER_DIRECTORY,
    PROJECT_DIRECTORY,
    ROUTE_CONFIG,
} from "./const.js";
import {
    buildRoute,
    buildUrl,
    calculatePriority,
    getHandler,
    getMethodKey,
    isFileIgnored,
    mergePaths,
    MODULE_IMPORT_PREFIX,
} from "./methods.js";
import type { File, Route, RouterOptions } from "./types.js";

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
            throw new Error(`Route '${route}' must not have a default export`);

        routes.push({
            url,
            priority,
            exports,
        });
    }

    return routes.sort((a, b) => a.priority - b.priority);
}
