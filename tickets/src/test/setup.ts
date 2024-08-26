import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}
// Define `mongo` with the correct type
let mongo: MongoMemoryServer;

// Hook that runs before all tests
beforeAll(async () => {
  process.env.JWT_KEY = "fuc";
  // Initialize and start the in-memory MongoDB server
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  // Connect to the in-memory MongoDB server
  await mongoose.connect(mongoUri);
});

// Hook that runs before each test
beforeEach(async () => {
  const collections = await mongoose.connection?.db?.collections();

  if (collections) {
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

// Hook that runs after all tests
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});


global.signin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId()._id,
    email: "test@test.com",
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`session=${base64}`];
};