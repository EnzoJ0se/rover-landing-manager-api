import { RoverMovementEnum } from "../enums/rover-movement.enum";
import { RoverModelInterface } from "./model-types/rover-model.interface";

export type RoverMovementInstructions = {
	[key in RoverMovementEnum]: (rover: RoverModelInterface) => void;
}
