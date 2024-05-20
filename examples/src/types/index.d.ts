import { z } from "zod";
import { ENV_VARS } from "../lib/validations/env";

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof ENV_VARS> {}
    }
}
