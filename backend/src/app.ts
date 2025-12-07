import express from "express";
import "dotenv/config";
import morgan from "morgan";
import appRouter from "./routes/index.js";

const app = express()

//middlewares
app.use(express.json());

// only use in development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/v1", appRouter)

export default app;