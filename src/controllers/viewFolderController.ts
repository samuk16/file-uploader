import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
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
