import { createApp } from "./app.js";
import { DEFAULT_PORT } from "./config/const.js";
import { Logger } from "./lib/logger.js";

export const logger = new Logger();
const app = createApp();

const port = process.env.PORT ?? DEFAULT_PORT;

const server = app.listen(port, () => {
    logger.info("File server started on port " + port);
});

export { server, app };
