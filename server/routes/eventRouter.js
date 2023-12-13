import { Router } from "express";
import { getEvents, addEvent, updateEvent, deleteEvent } from "../controllers/event.js";

const eventRouter = Router();

eventRouter.get("/", getEvents);
eventRouter.post("/addEvent", addEvent);
eventRouter.patch("/updateEvent/:id", updateEvent);
eventRouter.delete("/deleteEvent/:id", deleteEvent);

export default eventRouter;
