import type { Request, Response, NextFunction } from "express";
import { logInValidator } from "../validators/logInValidator";
import { validationResult } from "express-validator";
import type { CustomSession } from "../types/session";
export async function getLogIn(req: Request, res: Response) {
	const errors = (req.session as CustomSession).messages;
	(req.session as CustomSession).messages = [];
	res.render("pages/logInForm", { errors });
}

export const postLogIn = [
	logInValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.render("pages/logInForm", { errors: errors.array() });
			}

			next();
		} catch (err) {
			next(err);
		}
	},
];
