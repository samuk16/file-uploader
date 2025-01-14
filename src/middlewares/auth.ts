import type { NextFunction, Request, Response } from "express";
import type { CustomError } from "../types/customError";

export function isAuth(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		next();
	} else {
		const err: CustomError = new Error("Not authenticated");
		err.status = 401;
		next(err);
	}
}
