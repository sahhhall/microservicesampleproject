import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(express.json());
app.use(cookieSession({
  signed:false,
}))

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

let port: number = 3000;

const start = async () => {
  try {
    // when we enter something on end it will create db for us
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to mongodb")
  } catch (err) {
    console.log(err);
  }
};

app.listen(port, () => {
  console.log("server connected on port 3000!!!!!!!!");
});

start();
