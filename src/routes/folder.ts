import { Router } from "express";
import {
	getCreateFolder,
	getViewFolder,
	postCreateFolder,
} from "../controllers/folderController";
import { isAuth } from "../middlewares/auth";
const folderRouter = Router();

folderRouter.get("/create-folder", isAuth, getCreateFolder);
folderRouter.get("/:id", isAuth, getViewFolder);
folderRouter.post("/create-folder", ...postCreateFolder);

export default folderRouter;
