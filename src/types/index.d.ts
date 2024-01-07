import { z } from "zod";

const ENV_VARS = z.object({
    PORT: z.string().default("3001"),
});

ENV_VARS.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof ENV_VARS> {}
    }
}
