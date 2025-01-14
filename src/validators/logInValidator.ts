import { body } from "express-validator";

export const logInValidator = [
	body("username")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("Username must be at least 2 characters long"),
	body("password")
		.trim()
		.isLength({ min: 5 })
		.withMessage("Password must be at least 5 characters long"),
];
