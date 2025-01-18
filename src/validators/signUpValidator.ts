import { body } from "express-validator";

export const signUpFormValidator = [
	body("firstName")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("First name must be at least 2 characters long.")
		.isLength({ max: 50 })
		.withMessage("First name must be at most 50 characters long."),
	body("lastName")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("First name must be at least 2 characters long.")
		.isLength({ max: 50 })
		.withMessage("First name must be at most 50 characters long."),
	body("username")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("Username must be at least 2 characters long.")
		.isLength({ max: 15 })
		.withMessage("Username must be at most 15 characters long."),
	body("email").trim().isEmail().withMessage("Invalid email address."),
	body("password")
		.trim()
		.isLength({ min: 5 })
		.withMessage("Password must be at least 5 characters long.")
		.isLength({ max: 40 })
		.withMessage("Password must be at most 40 characters long."),
	body("confirmPassword").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Passwords do not match");
		}
		if (value === req.body.password) {
			return value;
		}
	}),
];
