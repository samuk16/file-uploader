import { Router } from "express";
import { getLogIn, postLogIn } from "../controllers/logInController";
import passport from "../config/passport";
const logInRouter = Router();

logInRouter.get("/", getLogIn);

logInRouter.post(
	"/",
	...postLogIn,
	passport.authenticate("local", {
		successRedirect: "/",
		failureMessage: "Incorrect username or password",
		failureRedirect: "/log-in",
	}),
);

export default logInRouter;
