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
		await prisma.$disconnect();
		console.log("Expire folders deleted");
	} catch (err) {
		await prisma.$disconnect();
		console.error(err);
	}
}

deleteExpireFolders();
