import { natsWrapper } from "./nats-wrapper";


const start = async () => {
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
  } catch (err) {
    console.log(err);
  }
};

start();
