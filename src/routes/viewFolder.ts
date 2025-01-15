import { Router } from "express";
import { getViewFolder } from "../controllers/viewFolderController";
import { isAuth } from "../middlewares/auth";

const viewFolderRouter = Router();

viewFolderRouter.get("/:id", isAuth, getViewFolder);

export default viewFolderRouter;
