import { Request, Response } from "express";
import Plateau from "../models/plateau.model";
import { PlateauDTO } from "../dto/plateau.dto";

async function get(req: Request, res: Response): Promise<Response<typeof Plateau[]>> {
    const plateaus = await Plateau.find({});

    if (!plateaus.length) {
        return res.send([]);
    }

    for (const plateau of plateaus) {
        await plateau.populate('rovers');
    }

    return res.send(plateaus);
}

async function show(req: Request, res: Response): Promise<Response<typeof Plateau>> {
    const plateau = await Plateau.findOne({ id: req.params.id });

    if (plateau) {
        await plateau.populate('rovers');
    }

    return res.send(plateau);
}

async function create(req: Request, res: Response): Promise<Response<typeof Plateau>> {
    const plateauDTO: PlateauDTO | string = PlateauDTO.fromRequest(req.body);

    if (typeof plateauDTO === "string") {
        return res.status(400).send(plateauDTO);
    }

    const plateau = Plateau.create(<PlateauDTO>plateauDTO);

    return res.send(plateau);
}

async function update(req: Request, res: Response): Promise<Response<typeof Plateau>> {
    const plateauDTO: PlateauDTO | string = PlateauDTO.fromRequest(req.body);

    if (typeof plateauDTO === "string") {
        return res.status(400).send(plateauDTO);
    }

    const plateau = await Plateau.where({ id: req.params.id }).updateOne(plateauDTO);

    return res.send(plateau);
}

async function destroy(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    await Plateau.deleteOne({ _id: id });

    return res.send({});
}

export default {
    get,
    show,
    create,
    update,
    destroy,
};
