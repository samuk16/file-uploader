import { Router } from "express";
import {
	getCreateFolder,
	postCreateFolder,
} from "../controllers/createFolderController";
import { isAuth } from "../middlewares/auth";
const createFolderRouter = Router();

createFolderRouter.get("/", isAuth, getCreateFolder);

createFolderRouter.post("/", ...postCreateFolder);

export default createFolderRouter;
