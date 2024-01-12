import dotenv from "dotenv";
import { createApp } from "./app";
import { DEFAULT_PORT } from "./lib/const";
import { Logger } from "./logger";

dotenv.config();

export const logger = new Logger();
const app = createApp();

const port = process.env.PORT ?? DEFAULT_PORT;

const server = app.listen(port, () => {
    logger.info("File server started on port " + port);
});

export { server, app };
