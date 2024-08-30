import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import {
  errorHandler,
  NotFoundError,
  curentUser,
} from "@sahhhalltickets/common";
import { createChargeRouter } from "./routes/new";



const app = express();

app.use(
  cors({
    origin: "http://192.168.49.2:30032", //  all domains
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.use(curentUser);


app.use(createChargeRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
