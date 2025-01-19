import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function deleteExpireFolders() {
	try {
		const now = new Date();
		await prisma.shareFolder.deleteMany({
			where: {
				expireDate: { lt: now },
			},
		});
	} catch (err) {
		console.error(err);
	}
}

deleteExpireFolders();
