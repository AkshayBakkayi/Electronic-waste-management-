import express from "express"
import { createSignup,login, getAllSignups, updateSignupById, deleteSignupById, resetPassword, changePassword } from "../controller/Signup.js";

const SignupRouter = express.Router();

SignupRouter.post("/createSignup", createSignup);
SignupRouter.get("/getall", getAllSignups);
SignupRouter.put("/updateSignupById/:id", updateSignupById);
SignupRouter.delete("/deleteSignupById/:id", deleteSignupById);
SignupRouter.post("/login", login);
SignupRouter.post('/forgot-password', resetPassword);
SignupRouter.put('/change-password', changePassword);
export default SignupRouter;