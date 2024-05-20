import { z } from "zod";

export const responseMessages = z.union([
    z.literal("OK"),
    z.literal("ERROR"),
    z.literal("UNAUTHORIZED"),
    z.literal("FORBIDDEN"),
    z.literal("NOT_FOUND"),
    z.literal("BAD_REQUEST"),
    z.literal("TOO_MANY_REQUESTS"),
    z.literal("INTERNAL_SERVER_ERROR"),
    z.literal("SERVICE_UNAVAILABLE"),
    z.literal("GATEWAY_TIMEOUT"),
    z.literal("UNKNOWN_ERROR"),
    z.literal("UNPROCESSABLE_ENTITY"),
    z.literal("NOT_IMPLEMENTED"),
    z.literal("CREATED"),
    z.literal("BAD_GATEWAY"),
]);

export const responseSchema = z.object({
    code: z.number(),
    message: responseMessages,
    longMessage: z.string().optional(),
    data: z.unknown().optional(),
});

export type ResponseMessages = z.infer<typeof responseMessages>;
export type ResponseData = z.infer<typeof responseSchema>;
