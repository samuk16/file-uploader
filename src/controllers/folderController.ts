import type { Request, Response, NextFunction } from "express";
import { createFolderValidator } from "../validators/createFolderValidator";
import { validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import type { CustomSession } from "../types/session";
import { CustomError } from "../types/customError";

const prisma = new PrismaClient();

// CREATE

export function getCreateFolder(req: Request, res: Response) {
	res.render("pages/createFolderForm", { title: "Create" });
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
			// console.log(userId);
			// console.log(titleFolder);
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
			// console.log(err);
			next(err);
		}
	},
];

// READ
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
		const files = await prisma.file.findMany({
			where: {
				folderId: folder?.id,
			},
		});
		await prisma.$disconnect();
		res.render("pages/viewFolder", { folder, files });
	} catch (err) {
		await prisma.$disconnect();
		next(err);
	}
}

// UPDATE

export async function getUpdateFolder(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const id = Number(req.params.id);
		const folder = await prisma.folder.findUnique({
			where: {
				id: id,
			},
		});

		res.render("pages/createFolderForm", {
			title: "edit",
			name: folder?.name,
			id: folder?.id,
		});
		await prisma.$disconnect();
	} catch (err) {
		await prisma.$disconnect();
		next(err);
	}
}

export const updateFolder = [
	createFolderValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.render("pages/createFolderForm", { errors: errors.array() });
			}
			const { titleFolder } = req.body;

			await prisma.folder.update({
				where: {
					id: Number(req.params.id),
				},
				data: {
					name: titleFolder,
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

//DELETE

export async function deleteFolder(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		await prisma.folder.delete({
			where: {
				id: Number(req.params.id),
			},
		});
		res.redirect("/");
	} catch (err) {
		next(err);
	}
}
