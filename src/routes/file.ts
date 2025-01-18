import { Router } from "express";
import { getAddFile, getFile, postFile } from "../controllers/fileController";

const addFileRouter = Router();

addFileRouter.get("/:id/add-file", getAddFile);
addFileRouter.post("/:id/add-file", ...postFile);
addFileRouter.get("/file/:id", getFile);
export default addFileRouter;
