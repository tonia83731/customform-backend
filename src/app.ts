import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";

const app: Application = express();

const port = process.env.PORT || 8080;
const mongoose_url = process.env.NEW_MONGODB_URL;

import router from "./routes/index";

const allowedOrigins = [
  "http://localhost:5173", // Development
  // "https://customform-frontend.vercel.app", // Production
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

mongoose
  .connect(mongoose_url as string)
  .then(() => console.log("mongodb connected!"))
  .catch((err: Error) => console.error("mongodb error!", err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
