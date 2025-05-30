import express from "express"
import { changePassword, createUser, deleteUserByEmail, findAllUsers, findUserById, login, updateUserById } from "../controller/UserController.js";

const userRouter = express.Router();
userRouter.post("/createUser", createUser);
userRouter.get("/", findAllUsers);
userRouter.get("/findByEmail/:id", findUserById)
userRouter.put("/updateById/:id", updateUserById);
userRouter.delete("/deleteByEmail/:email", deleteUserByEmail);
userRouter.post("/login", login);
userRouter.put("/changePassword/:id", changePassword);
export default userRouter;