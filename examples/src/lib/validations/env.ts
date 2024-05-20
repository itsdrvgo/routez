import { z } from "zod";

export const ENV_VARS = z.object({
    PORT: z.string().min(1).optional(),
});

ENV_VARS.parse(process.env);
