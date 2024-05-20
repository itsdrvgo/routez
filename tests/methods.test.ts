import { describe, expect, test } from "bun:test";
import * as methods from "../src/methods.js";

describe("methods", () => {
    test("convertParamSyntax", () => {
        expect(methods.convertParamSyntax("/")).toBe("/");
        expect(methods.convertParamSyntax("/test")).toBe("/test");
        expect(methods.convertParamSyntax("/test/:id")).toBe("/test/:id");
        expect(methods.convertParamSyntax("/test/:id/:name")).toBe(
            "/test/:id/:name"
        );
    });
    test("buildUrl", () => {
        expect(methods.buildUrl("/")).toBe("/");
        expect(methods.buildUrl("/test")).toBe("/test");
        expect(methods.buildUrl("/test/:id")).toBe("/test/:id");
        expect(methods.buildUrl("/test/:id/:name")).toBe("/test/:id/:name");
    });
    test("mergePaths", () => {
        expect(methods.mergePaths("/")).toBe("/");
        expect(methods.mergePaths("/test")).toBe("/test");
        expect(methods.mergePaths("/test", "/id")).toBe("/test/id");
        expect(methods.mergePaths("/test", "/id", "/name")).toBe(
            "/test/id/name"
        );
    });
    test("transformBrackets", () => {
        expect(methods.transformBrackets("test")).toBe("test");
        expect(methods.transformBrackets("[test]")).toBe(":test");
        expect(methods.transformBrackets("test/[id]")).toBe("test/:id");
    });
    test("calculatePriority", () => {
        expect(methods.calculatePriority("/")).toBe(0);
        expect(methods.calculatePriority("/test")).toBe(1);
        expect(methods.calculatePriority("/test/:id")).toBe(3);
        expect(methods.calculatePriority("/test/:id/:name")).toBe(5);
        expect(methods.calculatePriority("/test/:id/*")).toBe(Infinity);
    });
    test("getMethodKey", () => {
        expect(methods.getMethodKey("GET")).toBe("get");
        expect(methods.getMethodKey("POST")).toBe("post");
        expect(methods.getMethodKey("PUT")).toBe("put");
        expect(methods.getMethodKey("DELETE")).toBe("delete");
        expect(methods.getMethodKey("DEL")).toBe("delete");
    });
});
