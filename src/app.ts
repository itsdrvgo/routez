import BP from "body-parser";
import cors from "cors";
import express from "express";
import { createRouter } from "./lib";
import { initiateErrorHandler } from "./utils";

export function createApp() {
    const app = express();

    app.use(BP.urlencoded({ extended: false }));
    app.use(BP.json());
    app.use(cors());

    createRouter(app);
    initiateErrorHandler();

    return app;
}
