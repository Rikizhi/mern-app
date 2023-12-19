import { Router } from "express";
import { getDocuments, addDocument, updateDocument, deleteDocument } from "../controllers/document.js";

const documentRouter = Router();
documentRouter.get("/", getDocuments);
documentRouter.post("/addDocument", addDocument);
documentRouter.patch("/updateDocument/:id", updateDocument);
documentRouter.delete("/deleteDocument/:id", deleteDocument);

export default documentRouter;
