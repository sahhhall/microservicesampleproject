import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import {
  errorHandler,
  NotFoundError,
  curentUser,
} from "@sahhhalltickets/common";

import { newOrderRouter } from "./routes/new";
import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes/index";
import { showOrderRouter } from "./routes/show";

const app = express();

app.use(
  cors({
    origin: "http://192.168.49.2:30032", // Allows all domains
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
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
