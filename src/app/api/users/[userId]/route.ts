import { Request, Response } from "express";

export function GET(req: Request, res: Response) {
    const userId = req.params.userId;

    res.status(200).json({
        userId,
    });
}
