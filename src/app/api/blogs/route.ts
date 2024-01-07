import { Request, Response } from "express";

export function GET(req: Request, res: Response) {
    res.status(200).json({
        message: "Hello World!",
    });
}
