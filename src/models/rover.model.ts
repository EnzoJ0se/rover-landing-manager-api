import mongoose from "mongoose";
import { RoverModelInterface } from "../types/model-types/rover-model.interface";
import { CardinalDirectionEnum } from "../enums/cardinal-direction.enum";

const roverSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    direction: { type: typeof CardinalDirectionEnum, required: true },
});

const Rover = mongoose.model("Rover", roverSchema);

roverSchema.statics.create = (attr: RoverModelInterface) => new Rover(attr);

export default Rover;
