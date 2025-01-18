import type { NextFunction, Request, Response } from "express";

export function isAuth(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/log-in");
	}
}
