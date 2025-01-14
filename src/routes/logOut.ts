import { Router } from "express";

const logOutRouter = Router();

logOutRouter.post("/", (req, res, next) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/log-in");
	});
});

export default logOutRouter;
