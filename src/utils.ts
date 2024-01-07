import { init } from "@paralleldrive/cuid2";
import { Response } from "express";
import { ZodError } from "zod";
import { logger } from "./index";
import { ResponseMessages } from "./validations/response";

export const generateId = init({
    length: 16,
});

export function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function initiateErrorHandler() {
    logger.info("Error handler initiated");

    process.on("uncaughtException", (err) => {
        logger.error("Uncaught Exception - " + err.message + "\n" + err.stack);
    });

    process.on("unhandledRejection", (reason) => {
        logger.error("Unhandled Rejection - " + reason);
    });
}

export function handleError(err: unknown, res: Response) {
    if (err instanceof ZodError) {
        return CResponse({
            res,
            message: "BAD_REQUEST",
            longMessage: sanitizeError(err),
        });
    } else if (err instanceof Error) {
        return CResponse({
            res,
            message: "ERROR",
            longMessage: sanitizeError(err),
        });
    } else {
        return CResponse({
            res,
            message: "INTERNAL_SERVER_ERROR",
            longMessage: sanitizeError(err),
        });
    }
}

export function sanitizeError(err: unknown) {
    if (err instanceof ZodError) {
        return err.errors
            .map((e) =>
                e.code === "invalid_type"
                    ? `Expected ${e.expected} but received ${
                          e.received
                      } at ${e.path.join(".")}`
                    : e.message
            )
            .join(", ");
    } else if (err instanceof Error) {
        return err.message;
    } else {
        return "Unknown error";
    }
}

export function CResponse<T>({
    res,
    message,
    longMessage,
    data,
}: {
    res: Response;
    message: ResponseMessages;
    longMessage?: string;
    data?: T;
}) {
    let code: number;

    switch (message) {
        case "OK":
            code = 200;
            break;
        case "ERROR":
            code = 400;
            break;
        case "UNAUTHORIZED":
            code = 401;
            break;
        case "FORBIDDEN":
            code = 403;
            break;
        case "NOT_FOUND":
            code = 404;
            break;
        case "BAD_REQUEST":
            code = 400;
            break;
        case "TOO_MANY_REQUESTS":
            code = 429;
            break;
        case "INTERNAL_SERVER_ERROR":
            code = 500;
            break;
        case "SERVICE_UNAVAILABLE":
            code = 503;
            break;
        case "GATEWAY_TIMEOUT":
            code = 504;
            break;
        case "UNKNOWN_ERROR":
            code = 500;
            break;
        case "UNPROCESSABLE_ENTITY":
            code = 422;
            break;
        case "NOT_IMPLEMENTED":
            code = 501;
            break;
        case "CREATED":
            code = 201;
            break;
        case "BAD_GATEWAY":
            code = 502;
            break;
        default:
            code = 500;
            break;
    }

    return res.status(code).json({
        code,
        message,
        longMessage,
        data,
    });
}
