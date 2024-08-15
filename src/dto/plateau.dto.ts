export class PlateauDTO {
    public _id?: number;
    public x_size: number;
    public y_size: number;

    public static fromRequest(req: any): PlateauDTO | string {
        if (!req?.x_size) {
            return "x_size is required";
        }

        if (!req?.y_size) {
            return "y_size is required";
        }
        
        if (req.x_size <= 0) {
            return "x_size must be greater than 0";
        }

        if (req.y_size <= 0) {
            return "y_size must be greater than 0";
        }

        const plateau = new PlateauDTO();

        plateau.x_size = req.x_size;
        plateau.y_size = req.y_size;

        return plateau;
    }
}
