import type { Request, Response, NextFunction } from "express";
import { createFolderValidator } from "../validators/createFolderValidator";
import { validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import type { CustomSession } from "../types/session";
import { shareFormValidator } from "../validators/shareFormValidator";
import crypto from "node:crypto";
import type { CustomError } from "../types/customError";

const prisma = new PrismaClient();

// CREATE

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
			// console.log(err);
			next(err);
		}
	},
];

function genShareHash(folderId: number) {
	const uniqueId = crypto.randomBytes(16).toString("hex");
	return `${folderId}-${uniqueId}`;
}

export const postShareFolder = [
	shareFormValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const folderId = Number(req.params.id);
			const { dates } = req.body;

			const daysToAdd = Number(dates);
			const expireDate = new Date();
			const shareHashUrl = genShareHash(folderId);
			expireDate.setDate(expireDate.getDate() + daysToAdd);

			await prisma.shareFolder.create({
				data: {
					expireDate: expireDate,
					folderId: folderId,
					shareUrl: shareHashUrl,
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

// READ

export function getCreateFolder(req: Request, res: Response) {
	res.render("pages/createFolderForm", { title: "Create" });
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
			include: {
				files: true,
			},
		});
		// const files = await prisma.file.findMany({
		// 	where: {
		// 		folderId: folder?.id,
		// 	},
		// });
		await prisma.$disconnect();
		res.render("pages/viewFolder", { folder });
	} catch (err) {
		await prisma.$disconnect();
		next(err);
	}
}

export async function getShareForm(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const folderId = req.params.id;

		const folder = await prisma.shareFolder.findUnique({
			where: {
				folderId: Number(folderId),
			},
		});

		const baseUrl = `${req.protocol}://${req.hostname}:3000`;
		const now = new Date();
		if (folder && now < folder.expireDate) {
			// const err: CustomError = new Error(
			// 	"There is already an active shared folder for this folder.",
			// );
			// err.status = 400;
			// next(err);
			return res.render("pages/shareFolderForm", {
				folderId,
				activeLink: true,
				folder,
				baseUrl,
			});
		}
		await prisma.$disconnect();
		res.render("pages/shareFolderForm", { folderId });
	} catch (err) {
		await prisma.$disconnect();
		next(err);
	}
}

export async function getViewFolderShared(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const hashId = req.params.hashId;
		const shareFolder = await prisma.shareFolder.findUnique({
			where: {
				shareUrl: hashId,
			},
		});
		if (!shareFolder) {
			next(new Error("Folder not found"));
		}

		const now = new Date();
		if (shareFolder) {
			if (now > shareFolder.expireDate) {
				next(new Error("Link expired"));
			}
		}

		const folder = await prisma.folder.findUnique({
			where: {
				id: shareFolder?.folderId,
			},
			include: {
				files: true,
			},
		});

		await prisma.$disconnect();
		res.render("pages/viewFolder", { folder });
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
