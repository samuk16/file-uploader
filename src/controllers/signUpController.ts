import type { Request, Response, NextFunction } from "express";
import { signUpFormValidator } from "../validators/signUpValidator";
import { validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
export function getSignUp(req: Request, res: Response) {
	res.render("pages/signUpForm");
}
const prisma = new PrismaClient();
export const postSignUp = [
	signUpFormValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.render("pages/signUpForm", { errors: errors.array() });
			}
			const isRegistered = await prisma.user.findFirst({
				where: {
					OR: [{ username: req.body.username }, { email: req.body.email }],
				},
			});
			const { firstName, lastName, username, email, password } = req.body;

			if (isRegistered) {
				const errors = [];
				if (isRegistered.username === username) {
					errors.push({ msg: "Username already exists" });
				}
				if (isRegistered.email === email) {
					errors.push({ msg: "Email already exists" });
				}
				if (errors.length > 0) {
					res.render("pages/signUpForm", { errors: errors });
				}
			}

			bcrypt.genSalt(10, (err, salt) => {
				if (err) throw err;
				bcrypt.hash(password, salt, async (err, hash) => {
					if (err) throw err;
					await prisma.user.create({
						data: {
							fisrt_name: firstName,
							last_name: lastName,
							username: username,
							email: email,
							hash: hash,
						},
					});
				});
			});
			await prisma.$disconnect();
			res.redirect("/log-in");
		} catch (err) {
			await prisma.$disconnect();
			next(err);
		}
	},
];
