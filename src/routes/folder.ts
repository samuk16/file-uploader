import { Router } from "express";
import {
	deleteFolder,
	getCreateFolder,
	getUpdateFolder,
	getViewFolder,
	postCreateFolder,
	updateFolder,
} from "../controllers/folderController";
import { isAuth } from "../middlewares/auth";
const folderRouter = Router();

folderRouter.get("/create-folder", isAuth, getCreateFolder);
folderRouter.post("/create-folder", ...postCreateFolder);
folderRouter.get("/:id", isAuth, getViewFolder);
folderRouter.get("/:id/edit", isAuth, getUpdateFolder);
folderRouter.post("/:id", isAuth, ...updateFolder);
folderRouter.delete("/:id", isAuth, deleteFolder);

export default folderRouter;
