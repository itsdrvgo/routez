import { Request, Response } from "express";
import { z } from "zod";
import { CResponse, handleError } from "../../../utils";

const userSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(16, "Username must be at most 16 characters"),
    email: z.string().email(),
});

export function POST(req: Request, res: Response) {
    try {
        const data = req.body;

        const { username, email } = userSchema.parse(data);

        return CResponse({
            res,
            message: "OK",
            data: {
                username,
                email,
            },
        });
    } catch (e) {
        return handleError(e, res);
    }
}
