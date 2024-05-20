import type { Request, Response } from "express";
import { CResponse } from "../../../../lib/utils";

export function GET(req: Request, res: Response) {
    const userId = req.params.userId;

    return CResponse({
        res,
        message: "OK",
        data: {
            userId,
        },
    });
}
