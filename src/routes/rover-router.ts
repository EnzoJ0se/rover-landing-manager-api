import { Router } from "express";
import roverController from "../controllers/rover-controller";
import { on } from "events";

const roverRouter: Router = Router();

roverRouter.get("/", roverController.get);

roverRouter.post("/create-many", roverController.createManyRovers);

roverRouter.delete("/:id", roverController.destroy);

export default roverRouter;
