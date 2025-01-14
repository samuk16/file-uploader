import { Router } from "express";
import { getCreateFolder } from "../controllers/createFolderController";

const createFolderRouter = Router();

createFolderRouter.get("/", getCreateFolder);

export default createFolderRouter;
