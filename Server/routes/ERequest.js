import express from "express"
import { createERequest, getERequestByUserId, updateERequestById, deleteERequestById } from "../controller/ERequest.js";

const ERequestRouter = express.Router();

ERequestRouter.post("/createERequest", createERequest);
ERequestRouter.get("/:userId", getERequestByUserId);
ERequestRouter.put("/updateERequestById/:id", updateERequestById);
ERequestRouter.delete("/deleteERequestById/:id", deleteERequestById);

export default ERequestRouter;