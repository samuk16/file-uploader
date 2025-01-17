import type { Request, Response, NextFunction } from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY } from "../config/config";
import type { CustomSession } from "../types/session";
import { PrismaClient } from "@prisma/client";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });
const prisma = new PrismaClient();
export function getAddFile(req: Request, res: Response) {
	const folderId = Number(req.params.id);
	console.log(folderId);
	res.render("pages/addFileForm", { folderId });
}
interface User {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
}

async function uploadFile(path: string, file: Buffer) {
	const { data, error } = await supabase.storage
		.from("testeando")
		.upload(path, file);

	return { data, error };
}
async function getUrl(path: string) {
	const { data } = supabase.storage
		.from("testeando")
		.getPublicUrl(`${path}?download`);

	return { dataUrl: data };
}
export const postFile = [
	upload.single("uploaded_file"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const folderId = Number(req.params.id);
			// console.log(req.file?.filename);
			// console.log(req.file?.size);
			// console.log(req.file?.originalname);
			const folder = await prisma.folder.findUnique({
				where: {
					id: folderId,
				},
			});

			const user = req.user as User;
			// console.log(user);
			if (req.file) {
				const path = `${user.username}-${user.id}/${folder?.name}-${folder?.id}/${req.file?.originalname}`;
				const file = req.file.buffer;
				const { data, error } = await uploadFile(path, file);
				const { dataUrl } = await getUrl(data?.path as string);
				// console.log(data);
				// console.log(dataUrl);
				await prisma.file.create({
					data: {
						title: req.file?.originalname,
						size: req.file?.size.toString(),
						folderId: folderId,
						downloadUrl: dataUrl.publicUrl,
					},
				});
			}
			await prisma.$disconnect();
			res.redirect("/");
		} catch (err) {
			await prisma.$disconnect();
			next(err);
		}
	},
];

export async function getFiles(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const folderId = Number(req.params.id);
		const files = await prisma.file.findMany({
			where: {
				folderId: folderId,
			},
		});
		res.render("pages/viewFolder", { files });
		await prisma.$disconnect();
	} catch (err) {
		await prisma.$disconnect();
		next(err);
	}
}
