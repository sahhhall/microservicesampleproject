import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.use(cors({
  origin: 'http://192.168.49.2:30032', // Allows all domains
  credentials: true // Allow cookies to be sent with requests
}));

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.get("/", (req, res) => {
  res.send("hi");
});
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
