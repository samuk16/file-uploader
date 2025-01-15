import type { Request, Response, NextFunction } from "express";
import { createFolderValidator } from "../validators/createFolderValidator";
import { validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import type { CustomSession } from "../types/session";

const prisma = new PrismaClient();
export function getCreateFolder(req: Request, res: Response) {
	res.render("pages/createFolderForm");
}

export async function getViewFolder(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const folder = await prisma.folder.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});

		await prisma.$disconnect();
		res.render("pages/viewFolder", { folder });
	} catch (err) {
		await prisma.$disconnect();
		next(err);
	}
}

export const postCreateFolder = [
	createFolderValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.render("pages/createFolderForm", { errors: errors.array() });
			}
			const { titleFolder } = req.body;
			const userId = (req.session as CustomSession).passport.user;
			await prisma.folder.create({
				data: {
					name: titleFolder,
					userId: userId,
				},
			});
			await prisma.$disconnect();
			res.redirect("/");
		} catch (err) {
			await prisma.$disconnect();
			next(err);
		}
	},
];
