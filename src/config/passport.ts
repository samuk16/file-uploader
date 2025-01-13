import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
// import { pool } from "../db/pool";
import { PrismaClient } from "@prisma/client";
interface CustomUser extends Express.User {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	hash: string;
}

const prisma = new PrismaClient();

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			// const { rows } = await pool.query(
			// 	"SELECT * FROM users WHERE username = $1",
			// 	[username],
			// );

			const user = await prisma.user.findFirst({
				where: {
					username: username,
				},
			});
			console.log(user);
			// const user = rows[0] as CustomUser;
			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}

			const match = await bcrypt.compare(password, user.hash);

			if (!match) {
				return done(null, false, { message: "Incorrect password" });
			}
			await prisma.$disconnect();
			return done(null, user);
		} catch (err) {
			await prisma.$disconnect();
			// process.exit(1);
			return done(err);
		}
	}),
);

passport.serializeUser((user, done) => {
	const customUser = user as CustomUser;
	done(null, customUser.id);
});

passport.deserializeUser(async (id: number, done) => {
	try {
		// const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
		// 	id,
		// ]);
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});

		done(null, user);
		await prisma.$disconnect();
	} catch (err) {
		await prisma.$disconnect();
		done(err);
	}
});

export default passport;
