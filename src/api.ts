import mongoose from "mongoose";
import app from "./app";

const PORT = parseInt(`${process.env.PORT || 3000}`);

mongoose.connect(process.env.DATABASE_URL || "")
    .then(() => console.log("[database]: Connected to database"))
    .catch((error) => console.log(`[database]: ${error}`));

app.listen(PORT, () => console.log(`[server]: Server is running at http://localhost:${PORT}`));
