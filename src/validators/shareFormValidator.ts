import { body } from "express-validator";

export const shareFormValidator = [
	body("dates")
		.notEmpty()
		.withMessage("Please select a date")
		.isIn(["1", "2", "5"])
		.withMessage("Please select a valid date"),
];
