import { Router } from "express";
import { createEvent } from "../controllers/event.js";

const eventRouter = Router();
eventRouter.post("/createEvent", createEvent);

export default eventRouter;
