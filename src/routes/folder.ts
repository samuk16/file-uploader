import { Router } from "express";
import {
	deleteFolder,
	getCreateFolder,
	getShareForm,
	getUpdateFolder,
	getViewFolder,
	getViewFolderShared,
	postCreateFolder,
	postShareFolder,
	updateFolder,
} from "../controllers/folderController";
import { isAuth } from "../middlewares/auth";
import { get } from "node:http";
const folderRouter = Router();

folderRouter.get("/create-folder", isAuth, getCreateFolder);
folderRouter.post("/create-folder", ...postCreateFolder);
folderRouter.get("/:id", isAuth, getViewFolder);
folderRouter.get("/:id/edit", isAuth, getUpdateFolder);
folderRouter.get("/share/:id/create", isAuth, getShareForm);
// folderRouter.get("/share/:hashId", getViewFolderShared);
folderRouter.post("/share/:id", ...postShareFolder);
folderRouter.post("/:id", isAuth, ...updateFolder);
folderRouter.delete("/:id", isAuth, deleteFolder);

export default folderRouter;
