import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./controllers/connectDB";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
});

const app = express();
const routesHandler = require("./routes/sub-routes");

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL as string, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1", limiter, routesHandler);

app.listen(port, async () => {
  await connectDB();
  console.log("Server started on " + port);
});
