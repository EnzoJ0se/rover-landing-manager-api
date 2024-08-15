import { RoverDTO } from "../dto/rover.dto";
import Plateau from "../models/plateau.model";
import Rover from "../models/rover.model";
import { RoverModelInterface } from "../types/model-types/rover-model.interface";
import { RoverMovementEvent } from "../types/rover-movement-event";

export class RoverService {
    public async createRoversToLand(rovers: RoverDTO[]): Promise<RoverMovementEvent[]> {
        if (!rovers.length) {
            return [];
        }

        const roversToland: RoverMovementEvent[] = [];
        const plateau = await Plateau.findOne({});

        for (const data of rovers) {
            if (data.coordinates.x > plateau?.x_size || data.coordinates.y > plateau?.y_size) {
                continue;
            }

            const model: RoverModelInterface = <RoverModelInterface>(await Rover.create({
                x: data.coordinates.x,
                y: data.coordinates.y,
                direction: data.direction
            }));

            if (plateau) {
                plateau.rovers.push(model._id);
                await plateau.save();
            }

            roversToland.push({
                rover: model,
                instructions: data.instructions,
            });
        }

        return roversToland;
    }
}
