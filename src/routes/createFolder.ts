import { Router } from "express";
import { getCreateFolder } from "../controllers/createFolderController";
import { isAuth } from "../middlewares/auth";
const createFolderRouter = Router();

createFolderRouter.get("/", isAuth, getCreateFolder);

export default createFolderRouter;
