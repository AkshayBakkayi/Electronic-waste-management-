import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import cookieParser from "cookie-parser";

import adminRouter from "./routes/AdminRouter.js";
import scholorshipRouter from "./routes/ScholorshipRouter.js";

import applicationRouter from "./routes/ApplicationRouter.js";


import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';
import SignupRouter from "./routes/Signup.js";



dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use("/signup", SignupRouter);

app.use("/admin", adminRouter);
app.use("/scholorship", scholorshipRouter)

app.use("/application", applicationRouter);

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL; // Updated to match .env variable

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB Connected Successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on Port: ${PORT}`);
        });
    })
    .catch(error => console.log(error));


// Serve static files from the uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = path.join(__dirname, 'uploads');

console.log(uploadDirectory);

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory); // Set destination to your uploadDirectory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage });

// Middleware to serve static files
app.use('/uploads', express.static(uploadDirectory, { encodeUrl: true }));
