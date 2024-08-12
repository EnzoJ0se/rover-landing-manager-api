export class PlateauDTO {
    public _id?: number;
    public x_size: number;
    public y_size: number;

    public static fromRequest(req: any): PlateauDTO {
        if (!req?.x_size) {
            throw new Error("x_size is required");
        }

        if (!req?.y_size) {
            throw new Error("y_size is required");
        }

        const plateau = new PlateauDTO();

        plateau.x_size = req.x_size;
        plateau.y_size = req.y_size;

        return plateau;
    }
}
