import { Request, Response } from "express";
import multer from "multer";
import { z } from "zod";
import { handleError } from "../../../utils";

const upload = multer({ dest: "uploads/" });

const userSchema = z.object({
    name: z.string(),
    age: z.string(),
});

export const POST = [
    upload.single("file"),
    (req: Request, res: Response) => {
        try {
            const body = req.body;
            const file = req.file;

            const user = userSchema.parse(body);

            return res.status(200).json({
                message: "File uploaded successfully",
                data: {
                    file,
                    user,
                },
            });
        } catch (error) {
            return handleError(error, res);
        }
    },
];
