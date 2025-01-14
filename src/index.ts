import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import methodOverride from "method-override";
import { PORT, SESSION_SECRET } from "./config/config";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import passport from "./config/passport";
import logIngRouter from "./routes/logIn";
import signUpRouter from "./routes/signUp";
import logOutRouter from "./routes/logOut";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
	session({
		secret: SESSION_SECRET || "secret",
		resave: true,
		saveUninitialized: true,

		cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
		store: new PrismaSessionStore(new PrismaClient(), {
			checkPeriod: 2 * 60 * 1000,
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	}),
);
app.use(passport.session());
app.use((req, res, next) => {
	console.log(req.user);
	console.log(req.session);
	res.locals.currentUser = req.user;
	next();
});
app.get("/", (req, res) => {
	res.render("pages/index");
});
app.use("/log-in", logIngRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-out", logOutRouter);
app.listen(PORT || 8000, () => {
	console.log(`Server running on port ${PORT}`);
});
