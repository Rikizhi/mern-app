import { Router } from "express";
import { getDocuments, addDocument, updateDocument } from "../controllers/document.js";

const documentRouter = Router();
documentRouter.get("/", getDocuments);
documentRouter.post("/addDocument", addDocument);
documentRouter.patch("/updateDocument/:id", updateDocument);

export default documentRouter;
