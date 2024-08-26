import mongoose from "mongoose";
import { app } from "./app";

let port: number = 3000;

const start = async () => {
  try {
    // when we enter something on end it will create db for us
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

app.listen(port, () => {
  console.log("server connected on port 3000!!!!!!!!");
});

start();
