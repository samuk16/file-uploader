import { Router } from "express";
import { getAddFile, getFile, postFile } from "../controllers/fileController";
import { isAuth } from "../middlewares/auth";

const addFileRouter = Router();

addFileRouter.get("/:id/add-file", isAuth, getAddFile);
addFileRouter.post("/:id/add-file", isAuth, ...postFile);
addFileRouter.get("/:folderId/file/:id", getFile);
export default addFileRouter;
