import { body } from "express-validator";

export const createFolderValidator = [
	body("titleFolder")
		.trim()
		.escape()
		.isLength({ min: 2 })
		.withMessage("Folder name must be at least 2 characters long.")
		.isLength({ max: 50 })
		.withMessage("Folder name must be at most 50 characters long."),
];
