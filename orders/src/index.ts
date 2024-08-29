import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/listners/ticket-created-listner";
import { TicketUpdatedListener } from "./events/listners/ticket-updated-listner";
import { ExpirationCompleteListener } from "./events/listners/expiration-completed-listener";

let port: number = 3000;

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_IDmust defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must defined");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NAts connnection closed");
      process.exit();
    });
    // Handle interrupt signal (eg ctrl+C in cli)
    process.on("SIGINT", () => natsWrapper.client.close());

    // Handle termination signal (eg sent by process managers like k8)
    process.on("SIGTERM", () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    // when we enter something on end it will create db for us
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(port, () => {
    console.log("server connected on port 3000!!!!!!!!");
  });
};

start();
