import { Router } from "express";
import {
	deleteFolder,
	getCreateFolder,
	getShareForm,
	getUpdateFolder,
	getViewFolder,
	postCreateFolder,
	postShareFolder,
	updateFolder,
} from "../controllers/folderController";
import { isAuth } from "../middlewares/auth";
const folderRouter = Router();

folderRouter.get("/create-folder", isAuth, getCreateFolder);
folderRouter.post("/create-folder", isAuth, ...postCreateFolder);
folderRouter.get("/:id", isAuth, getViewFolder);
folderRouter.get("/:id/edit", isAuth, getUpdateFolder);
folderRouter.get("/share/:id/create", isAuth, getShareForm);
folderRouter.post("/share/:id", isAuth, ...postShareFolder);
folderRouter.post("/:id", isAuth, isAuth, ...updateFolder);
folderRouter.delete("/:id", isAuth, deleteFolder);

export default folderRouter;
