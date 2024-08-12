import mongoose from "mongoose";
import { PlateauModelInterface } from "../types/model-types/plateau-model.interface";

const plateauSchema = new mongoose.Schema({
    x_size: { type: Number, required: true },
    y_size: { type: Number, required: true },
    rovers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rover"
    }],
});
const Plateau = mongoose.model("Plateau", plateauSchema);

plateauSchema.statics.create = (attr: PlateauModelInterface) => new Plateau(attr);

export default Plateau;

