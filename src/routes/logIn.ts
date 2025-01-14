import { Router } from "express";
import { getLogIn, postLogIn } from "../controllers/logInController";

const logInRouter = Router();

logInRouter.get("/", getLogIn);

logInRouter.post("/", ...postLogIn);

export default logInRouter;
