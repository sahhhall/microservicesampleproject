import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import {
  errorHandler,
  NotFoundError,
  curentUser,
} from "@sahhhalltickets/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

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
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
