import { CardinalDirectionEnum } from "../enums/cardinal-direction.enum";
import { RoverMovementEnum } from "../enums/rover-movement.enum";
import { RoverMovementInstructions } from "../types/rover-movement-instruction";
import { RoverModelInterface } from "../types/model-types/rover-model.interface";
import { RoverMovementEvent } from "../types/rover-movement-event";
import { PlateauModelInterface } from "../types/model-types/plateau-model.interface";
import Rover from "../models/rover.model";
import Plateau from "../models/plateau.model";

export class LandingService {
    private plateau: PlateauModelInterface = null;
    private roversToLand: RoverMovementEvent[] = [];
    private intructionData: RoverMovementInstructions = {
        [RoverMovementEnum.L]: (rover: RoverModelInterface) => this.rotateAxis(rover, RoverMovementEnum.L),
        [RoverMovementEnum.R]: (rover: RoverModelInterface) => this.rotateAxis(rover, RoverMovementEnum.R),
        [RoverMovementEnum.M]: (rover: RoverModelInterface) => this.moveRover(rover),
    };

    public async landRovers(rovers: RoverMovementEvent[]): Promise<void> {
        if (!this.plateau) {
            this.plateau = <PlateauModelInterface>(await Plateau.findOne({}));
        }

        this.roversToLand = rovers;
        await this.syncRoverMovements();
    }

    public async syncRoverMovements(): Promise<void> {
        if (!this.roversToLand.length) {
            return;
        }

        const { rover, instructions } = this.roversToLand.shift();
        const movementList: RoverMovementEnum[] = <RoverMovementEnum[]>instructions.split('');

        do {
            const movement: RoverMovementEnum = <RoverMovementEnum>movementList.shift();

            this.intructionData[movement](rover);

            await Rover.updateOne(
                { _id: rover._id },
                { direction: rover.direction, x: rover.x, y: rover.y }
            );
        } while (movementList.length);

        await this.syncRoverMovements();
    }

    private rotateAxis(rover: RoverModelInterface, direction: RoverMovementEnum): void {
        if (direction === RoverMovementEnum.L) {
            rover.direction = {
                [CardinalDirectionEnum.N]: CardinalDirectionEnum.W,
                [CardinalDirectionEnum.W]: CardinalDirectionEnum.S,
                [CardinalDirectionEnum.S]: CardinalDirectionEnum.E,
                [CardinalDirectionEnum.E]: CardinalDirectionEnum.N,
            }[rover.direction];

            return;
        }

        rover.direction = {
            [CardinalDirectionEnum.N]: CardinalDirectionEnum.E,
            [CardinalDirectionEnum.E]: CardinalDirectionEnum.S,
            [CardinalDirectionEnum.S]: CardinalDirectionEnum.W,
            [CardinalDirectionEnum.W]: CardinalDirectionEnum.N,
        }[rover.direction];
    }

    private moveRover(rover: RoverModelInterface): void {
        if (rover.direction == CardinalDirectionEnum.N) {
            rover.y = rover.y - 1 < 0 ? 0 : rover.y - 1;

            return;
        }

        if (rover.direction == CardinalDirectionEnum.S) {
            rover.y = rover.y + 1 > this.plateau.y_size ? this.plateau.y_size : rover.y + 1;

            return;
        }

        if (rover.direction == CardinalDirectionEnum.E) {
            rover.x = rover.x + 1 > this.plateau.x_size ? this.plateau.x_size : rover.x + 1;

            return;
        }

        rover.x = rover.x - 1 < 0 ? 0 : rover.x - 1;
    }
}
