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
        const images = req.files as Express.Multer.File[];

        const { username, email } = userSchema.parse(data);

        return CResponse({
            res,
            message: "OK",
            data: {
                username,
                email,
                files: images.map((image) => image.originalname),
            },
        });
    } catch (e) {
        return handleError(e, res);
    }
}

export function GET(req: Request, res: Response) {
    const userId = req.params.userId;

    res.status(200).json({
        message: "Hello World!",
        userId,
    });
}
