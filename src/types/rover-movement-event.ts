import { RoverModelInterface } from "./model-types/rover-model.interface";

export interface RoverMovementEvent {
	rover: RoverModelInterface;
	instructions: string;
}
