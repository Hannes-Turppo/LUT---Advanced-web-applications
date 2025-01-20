import express, { Express } from 'express';
import path from "path";
import userRouter from "./src/router/user";
import topicRouter from "./src/router/topic";
import morgan from "morgan";
import mongoose, { Connection } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT: string = process.env.PORT as string;

const mongoDB: string = process.env.MONGODB as string;
mongoose.connect(mongoDB);
const db: Connection = mongoose.connection;
db.on("connected", () => {
    console.log("Connected to MongoDB");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/user", userRouter);
app.use("/api", topicRouter);

app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});
