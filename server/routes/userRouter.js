import { Router } from "express";
import { addUser, getUsers, login, register, updateProfile, updateStatus } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const userRouter = Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.patch("/updateProfile", auth, updateProfile);
userRouter.get("/", getUsers);
userRouter.patch("/updateStatus/:userId", updateStatus);
userRouter.post("/addUser", addUser);

export default userRouter;
