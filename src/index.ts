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
import folderRouter from "./routes/folder";
import type { Request, Response, NextFunction } from "express";
import type { CustomError } from "./types/customError";
import indexRouter from "./routes/indexRoute";
import addFileRouter from "./routes/addFile";

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
	// console.log(req.user);
	// console.log(req.session);
	res.locals.currentUser = req.user;
	next();
});
app.use("/", indexRouter);
app.use("/log-in", logIngRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-out", logOutRouter);
app.use("/folder", folderRouter);
app.use("/add-file", addFileRouter);
app.use("*", (req: Request, res: Response, next: NextFunction) => {
	const error: CustomError = new Error("Page not found");
	error.status = 404;
	next(error);
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
	res
		.status(err.status || 500)
		.render("pages/error", { error: err.message, status: err.status || 500 });
});

app.listen(PORT || 8000, () => {
	console.log(`Server running on port ${PORT}`);
});
