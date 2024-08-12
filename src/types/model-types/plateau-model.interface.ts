import { RoverModelInterface } from "./rover-model.interface";

export interface PlateauModelInterface {
    x_size: number;
    y_size: number;
    rovers: RoverModelInterface[];
}
