import { Request, Response } from "express";
import Rover from "../models/rover.model";
import { RoverDTO } from "../dto/rover.dto";
import { RoverService } from "../services/rover.service";
import { LandingService } from "../services/landing.service";
import { RoverMovementEvent } from "../types/rover-movement-event";
import { Types } from "mongoose";

const roverService: RoverService = new RoverService();
const landingService: LandingService = new LandingService();

async function get(req: Request, res: Response): Promise<Response<typeof Rover[]>> {
    const rovers = await Rover.find({});

    return res.send(rovers);
}

async function createManyRovers(req: Request, res: Response) {
    const roverDTOs: RoverDTO[] = RoverDTO.fromRequest(req.body);

    if (!roverDTOs.length) {
        return res.status(400).send("Invalid data");
    }

    const roverMovements: RoverMovementEvent[] = await roverService.createRoversToLand(roverDTOs);
    const roverIds: Types.ObjectId[] = roverMovements.map(item => item.rover._id);
    const response = [];

    await landingService.landRovers(roverMovements);

    for (const roverId of roverIds) {
        response.push(await Rover.findOne({ _id: roverId }));
    }

    return res.send(response);
}

async function destroy(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    await Rover.deleteOne({ _id: id });

    return res.send({});
}

export default {
    get,
    destroy,
    createManyRovers,
}
