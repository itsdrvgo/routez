import dotenv from "dotenv";
import { createApp } from "./app";
import { Logger } from "./logger";

dotenv.config();

export const logger = new Logger();
const app = createApp();

const server = app.listen(process.env.PORT, () => {
    logger.info("File server started on port " + process.env.PORT);
});

export { server, app };
