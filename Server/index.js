import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/CategoryRouter.js";
import notificationRouter from "./routes/NotificationsRouter.js";
import phonePeRoute from "./routes/PhonePeRouter.js";
import RequestRouter from "./routes/ERequest.js";
import SignupRouter from "./routes/Signup.js";
import userRouter from "./routes/UserRouter.js";

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3000', // Allow only this origin
    credentials: true, // Allow credentials (cookies)
    optionsSuccessStatus: 200 // For legacy browser support
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/singup", SignupRouter);
app.use("/category", categoryRouter);
app.use("/request", RequestRouter);
app.use("/notification", notificationRouter);
app.use("/api/phonepe", phonePeRoute);
app.use("/user", userRouter);

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
