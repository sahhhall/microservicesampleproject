import mongoose from "mongoose";
import { app } from "./app";

let port: number = 3000;

const start = async () => {
  console.log("staring ppppp")
  if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI must defined")
  }
  try {
    // when we enter something on end it will create db for us
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

app.listen(port, () => {
  console.log("server connected on port 3000!!!!!!!!");
});

start();
