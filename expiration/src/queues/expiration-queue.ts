import Queue from "bull";

interface payload {
  orderId: string;
}

const expirationQueue = new Queue<payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

// the job not actaul  data it is an obj wraps up on data so data is one of the property
// on there

expirationQueue.process(async (job) => {
  console.log(
    "i want to publcih an exipration: complete evenet for orderid",
    job.data.orderId
  );
});

export { expirationQueue }