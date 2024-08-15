import { Types } from "mongoose";
import { CardinalDirectionEnum } from "../../enums/cardinal-direction.enum";

export interface RoverModelInterface {
	_id?: Types.ObjectId;
	x: number;
	y: number;
	direction: CardinalDirectionEnum;
}
