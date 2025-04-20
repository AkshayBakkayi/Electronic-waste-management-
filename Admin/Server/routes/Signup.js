import express from "express"
import { createSignup,login, getAllSignups, updateSignupById, deleteSignupById, FindUserscounts } from "../controller/Signup.js";

const SignupRouter = express.Router();

SignupRouter.post("/createSignup", createSignup);
SignupRouter.get("/getall", getAllSignups);
SignupRouter.get("/Usercount",FindUserscounts)
SignupRouter.put("/updateSignupById/:id", updateSignupById);
SignupRouter.delete("/deleteSignupById/:id", deleteSignupById);
SignupRouter.post("/login", login);

export default SignupRouter;