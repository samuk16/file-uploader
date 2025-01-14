import { Router } from "express";
import { getSignUp, postSignUp } from "../controllers/signUpController";

const signUpRouter = Router();

signUpRouter.get("/", getSignUp);
signUpRouter.post("/", ...postSignUp);
export default signUpRouter;
