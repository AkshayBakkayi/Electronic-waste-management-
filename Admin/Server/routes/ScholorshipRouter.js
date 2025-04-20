import express from "express"
import { createCategory, getAllCategories, updateCategoryById, deleteCategoryById, getScholorshipById } from "../controller/ScholorshipController.js";

const scholorshipRouter = express.Router();

scholorshipRouter.post("/createCategory", createCategory);
scholorshipRouter.get("/", getAllCategories);
scholorshipRouter.get("/getScholorshipById/:id", getScholorshipById)
scholorshipRouter.put("/updateCategoryById/:id", updateCategoryById);
scholorshipRouter.delete("/deleteCategoryById/:id", deleteCategoryById);

export default scholorshipRouter;