import { CardinalDirectionEnum } from "../enums/cardinal-direction.enum";
import { Coordinate } from "../types/coordinate";

export class RoverDTO {
    public coordinates: Coordinate;
    public direction: CardinalDirectionEnum;
    public instructions: string;

    public static fromRequest(req: any): RoverDTO[] {
        return req.data?.map((data): RoverDTO => {
            const rover = new RoverDTO();

            rover.coordinates = data.coordinates;
            rover.direction = data.direction;
            rover.instructions = data.instructions;

            return rover;
        });
    }
}
