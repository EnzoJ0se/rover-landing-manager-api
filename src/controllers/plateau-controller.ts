import { Request, Response } from "express";
import Plateau from "../models/plateau.model";
import { PlateauDTO } from "../dto/plateau.dto";

async function get(req: Request, res: Response) {
    const plateaus = await Plateau.find({});

    return res.send(plateaus);
}

async function show(req: Request, res: Response) {
    const plateau = await Plateau.findOne({id: req.params.id});

    return res.send(plateau);
}

async function create(req: Request, res: Response) {
    console.log(req.body);
    
    const plateauDTO = PlateauDTO.fromRequest(req.body);
    const plateau = Plateau.create(plateauDTO);

    return res.send(plateau);
}

async function update(req: Request, res: Response) {
    const plateauDTO = PlateauDTO.fromRequest(req.body);
    const plateau = await Plateau.where({id: req.params.id}).updateOne(plateauDTO);
    
    return res.send(plateau);
}

export default {
    get,
    show,
    create,
    update,
};
