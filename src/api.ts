import express, { Express, Request, Response } from "express";
import appRouter from "./routes/app-router";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Plateau from "./models/plateau.model";

dotenv.config();

const app: Express = express();
const PORT = parseInt(`${process.env.PORT || 3000}`);

app.use(cors());
app.use(express.json());
app.use("/api", appRouter);
app.get("/", (req: Request, res: Response) => res.send("API is running..."));

mongoose.connect(process.env.DATABASE_URL || "")
    .then(() => console.log("[database]: Connected to database"))
    .catch((error) => console.log(`[database]: ${error}`));

app.listen(PORT, () => console.log(`[server]: Server is running at http://localhost:${PORT}`));
