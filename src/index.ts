import { AppDataSource } from "./data-source"

//midlewares
import trim from "./middlewares/trim"

import express from "express" 
import morgan from "morgan";
import authRoutes from "./routes/auth";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

//middlewares
app.use(trim);


//routes
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/auth", authRoutes);

app.listen(4000, async () => {
    console.log("Server running on port 4000");
    await AppDataSource.initialize();
    console.log("Database connected");
})