import type { Handler } from "express";

export type MethodExport = Handler | Handler[];

export interface MethodExports {
    get?: MethodExport;
    post?: MethodExport;
    put?: MethodExport;
    patch?: MethodExport;
    delete?: MethodExport;
    head?: MethodExport;
    connect?: MethodExport;
    options?: MethodExport;
    trace?: MethodExport;

    [x: string]: MethodExport | undefined;
}

export type Exports = MethodExports & {
    default?: any;
};

export interface RouterOptions {
    directory?: string;
}

export interface File {
    name: string;
    path: string;
    rel: string;
}

export interface Route {
    url: string;
    priority: number;
    exports: Exports;
}
