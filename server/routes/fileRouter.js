import { Router } from "express";
import { createFile, deleteFile } from "../controllers/file.js";

const fileRouter = Router();
fileRouter.post("/upload", createFile);
fileRouter.delete("/:id", deleteFile);

export default fileRouter;
