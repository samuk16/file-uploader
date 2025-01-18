import { Router } from "express";
import { getIndex } from "../controllers/indexController";
import { isAuth } from "../middlewares/auth";

const indexRouter = Router();

indexRouter.get("/", isAuth, getIndex);

export default indexRouter;
