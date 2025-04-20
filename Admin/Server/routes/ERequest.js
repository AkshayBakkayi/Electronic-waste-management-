import express from "express"
import { createERequest, getAllERequests, updateERequestById, deleteERequestById } from "../controller/ERequest.js";

const ERequestRouter = express.Router();

ERequestRouter.post("/createERequest", createERequest);
ERequestRouter.get("/getall", getAllERequests);
ERequestRouter.put("/updateERequestById/:id", updateERequestById);
ERequestRouter.delete("/deleteERequestById/:id", deleteERequestById);

export default ERequestRouter;