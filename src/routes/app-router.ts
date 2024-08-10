import { Router } from "express";
import roverRouter from "./rover-router";
import plateauRouter from "./plateau-router";

const appRouter: Router = Router();

appRouter.use("/rover", roverRouter);
appRouter.use("/plateau", plateauRouter);

export default appRouter;
