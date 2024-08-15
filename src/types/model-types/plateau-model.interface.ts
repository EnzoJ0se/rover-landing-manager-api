import { Types } from "mongoose";
import { RoverModelInterface } from "./rover-model.interface";

export interface PlateauModelInterface {
    _id?: Types.ObjectId;
    x_size: number;
    y_size: number;
    rovers: RoverModelInterface[];
}
