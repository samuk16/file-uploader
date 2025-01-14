import type { Request, Response, NextFunction } from "express";
import { logInValidator } from "../validators/logInValidator";
import { validationResult } from "express-validator";
export async function getLogIn(req: Request, res: Response) {
	res.render("pages/logInForm");
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
