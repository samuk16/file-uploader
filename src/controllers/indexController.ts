import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import type { CustomSession } from "../types/session";

const prisma = new PrismaClient();
export async function getIndex(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const folders = await prisma.folder.findMany({
			where: {
				userId: (req.session as CustomSession).passport.user,
			},
		});
		console.log(folders);
		await prisma.$disconnect();
		res.render("pages/index", { folders });
	} catch (err) {
		await prisma.$disconnect();
		next(err);
	}
}
