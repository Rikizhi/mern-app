import { Router } from "express";

import { createMain } from "../controllers/main.js";
import auth from "../middleware/auth.js";

const mainRouter = Router();
mainRouter.post("/", auth, createMain);

export default mainRouter;
